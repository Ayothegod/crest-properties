import { lucia } from "@/auth";
import { prisma } from "@/lib/prisma";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";

export const auth = {
  createUser: defineAction({
    input: z.object({
      fullname: z.string(),
      password: z.string(),
      email: z.string()
    }),
    async handler(input, context) {
      try {
        // TODO: check if user already exists
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
            id: userId
          }
        })
        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      
        return user
        // return context.redirect("/")
      } catch (error) {
        console.log({ CreateUser: "Error" });
        return
      }
    },
  }),
  // getUser: defineAction(/* ... */),
};
