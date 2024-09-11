import { prisma } from "@/lib/prisma";
import { defineAction } from "astro:actions";
import { auth } from "./auth";
// import { z } from 'astro:schema';

export const server = {
  getAllUsers: defineAction({
    async handler(input, context) {
      try {
        const user = context.locals.user
        // console.log(user);
        
        if (!user) {
          return context.rewrite("/register");
        }
        // const users = await prisma.user.findMany({});
        return { data: "users" };
      } catch (error) {
        return { error: "An error occurred" };
      }
    },
  }),
  auth,
};
// const user = context.locals.user;
