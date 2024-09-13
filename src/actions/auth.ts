import { lucia } from "@/auth";
import { prisma } from "@/lib/prisma";
import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";
import { hash, verify } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import Mailgun from "mailgun.js";
import FormData from "form-data";

export const auth = {
  createUser: defineAction({
    input: z.object({
      fullname: z.string(),
      password: z.string(),
      email: z.string(),
    }),
    async handler(input, context) {
      // try {
      const checkUser = await prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });
      if (checkUser) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message:
            "Looks like this email is already taken. Try logging in instead!",
        });
      }

      const userId = generateIdFromEntropySize(10);
      const passwordHash = await hash(input.password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      });

      const user = await prisma.user.create({
        data: {
          fullname: input.fullname,
          password: passwordHash,
          email: input.email,
          id: userId,
        },
      });
      const session = await lucia.createSession(userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      context.cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      console.log(import.meta.env.MAILGUN_API_KEY);
      console.log(import.meta.env.MAILGUN_DOMAIN_NAME);

      const mailgun = new Mailgun(FormData);
      const mg = mailgun.client({
        username: "api",
        key: import.meta.env.MAILGUN_API_KEY,
      });

      const data = {
        from: "crestproperties@coldmetal.com",
        to: [`${input.email}`],
        subject: "Welcome to Crest Properties",
        html: `<h1><strong>Welcome to Crest Properties</strong></h1>
    <p>You're so in!</p>`,
      };
      let mailResult = "PENDING";
      console.log(mailResult);

      mg.messages
        .create(import.meta.env.MAILGUN_DOMAIN_NAME, data)
        .then((msg) => {
          console.log(msg);
          mailResult = "SENT";
          // console.log(mailResult);
        })
        .catch((err) => {
          console.error(err);
          mailResult = "FAILED";
        });

      return user;
    },
  }),
  loginUser: defineAction({
    input: z.object({
      password: z.string(),
      email: z.string(),
    }),
    async handler(input, context) {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });
      if (!existingUser) {
        throw new ActionError({
          code: "FORBIDDEN",
          message: "Incorrect username or password. Please try again.",
        });
      }

      const validPassword = await verify(
        existingUser.password,
        input.password,
        {
          memoryCost: 19456,
          timeCost: 2,
          outputLen: 32,
          parallelism: 1,
        },
      );
      if (!validPassword) {
        throw new ActionError({
          code: "FORBIDDEN",
          message: "Incorrect username or password. Please try again.",
        });
      }
      
      const userId = generateIdFromEntropySize(10);
      const session = await lucia.createSession(userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      context.cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      return existingUser;
    },
  }),

  // getUser: defineAction(/* ... */),
};
