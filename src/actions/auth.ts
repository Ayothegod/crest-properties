import { lucia } from "@/auth";
import { prisma } from "@/lib/prisma";
import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";
import { hash, verify } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import Mailgun from "mailgun.js";
import FormData from "form-data";
import { generateOTP } from "@/lib/services";
import Queue from "bull";
import jwt from "jsonwebtoken";

// const user = context.locals.user;
// if (!user) {
// 	return context.redirect("/login");
// }

// const username = user.username;

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

      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      context.cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      return existingUser;
    },
  }),
  requestOTP: defineAction({
    input: z.object({
      email: z.string(),
    }),
    async handler(input, context) {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: input.email,
        },
        include: {
          otp: true,
          profile: true,
        },
      });
      if (!existingUser) {
        throw new ActionError({
          code: "FORBIDDEN",
          message: "Incorrect email. Please try again.",
        });
      }

      if (existingUser.otp) {
        throw new ActionError({
          code: "TOO_MANY_REQUESTS",
          message: "Incorrect email. Please try again.",
        });
      }

      const otp = generateOTP(6);
      const databaseOtp = await prisma.otp.create({
        data: {
          otp: otp,
          userId: existingUser.id,
        },
      });

      async function deleteScheduledItems() {
        const otpToDelete = await prisma.otp.findUnique({
          where: {
            id: databaseOtp.id,
          },
        });

        if (otpToDelete) {
          try {
            await prisma.otp.delete({
              where: { id: otpToDelete.id },
            });
            console.log(`Otp with id ${otpToDelete.id} deleted successfully.`);
          } catch (error) {
            console.error(`Error deleting item ${otpToDelete.id}:`, error);
          }
        } else {
          console.log("Otp not found.");
        }
      }

      setInterval(deleteScheduledItems, 5 * 60 * 1000);

      // SEND OTP TO CLIENT
      const mailgun = new Mailgun(FormData);
      const mg = mailgun.client({
        username: "api",
        key: import.meta.env.MAILGUN_API_KEY,
      });
      const data = {
        from: "crestproperties@coldmetal.com",
        to: [`${input.email}`],
        subject: "Action Required: Your Request Will Expire in 5 Minutes",
        html: `
        <div>
        <h2>Hi ${existingUser.fullname},</h2>
        <br/>
        <p>We received a request related to your account. Please note that this request will expire in 5 minutes. If you do not complete the required
        action before this time, you may need to initiate the process again.</p>
        <p>OTP code: ${databaseOtp.otp}</p>
        <br/>
        <p>If you didn’t make this request, you can safely ignore this email.</p>
        <br/>
        <p>Thank you for being part of Crest Properties!</p>
        <br/>
        <br/>
        <p>Best regards,</p>
        <h4>The Crest Properties Team</h4>
      </div>
          `,
      };

      mg.messages
        .create(import.meta.env.MAILGUN_DOMAIN_NAME, data)
        .then((msg) => {
          console.log(msg);
          // console.log(mailResult);
        })
        .catch((err) => {
          console.error(err);
        });

      return "Success";
    },
  }),
  verifyOtp: defineAction({
    input: z.object({
      otp: z.string(),
    }),
    async handler(input, context) {
      const existingOtp = await prisma.otp.findUnique({
        where: {
          otp: input.otp,
        },
      });
      console.log(existingOtp);

      if (!existingOtp) {
        throw new ActionError({
          code: "FORBIDDEN",
          message:
            "OTP is either incorrect or expired. Please request a new one and try again.",
        });
      }

      const secretKey = import.meta.env.JWT_SECRET_KEY;
      const generateToken = (userId: string) => {
        return jwt.sign({ userId }, secretKey, { expiresIn: "5m" });
      };
      const token = generateToken(existingOtp.userId);

      return token;
    },
  }),
  updatePassword: defineAction({
    input: z.object({
      password: z.string(),
      confirmPassword: z.string(),
      token: z.string(),
    }),
    async handler(input, context) {
      const secretKey = import.meta.env.JWT_SECRET_KEY;
      const decoded: any = jwt.verify(input.token, secretKey);

      const passwordHash = await hash(input.password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      });

      const userWithNewPassword = await prisma.user.update({
        where: {
          id: decoded.userId,
        },
        data: {
          password: passwordHash,
        },
      });
      if (!userWithNewPassword) {
        throw new ActionError({
          code: "NOT_FOUND",
          message: "There was an error while trying to reset password!",
        });
      }

      return "Success";
    },
  }),
  signOut: defineAction({
    async handler(input, context) {
      if (!context.locals.session) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message:
            "User is already logged out.",
        });
      }
    
      await lucia.invalidateSession(context.locals.session.id);
    
      const sessionCookie = lucia.createBlankSessionCookie();
      context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    
      return
    },
  }),
};
