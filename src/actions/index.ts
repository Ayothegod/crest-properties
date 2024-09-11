import { prisma } from "@/lib/prisma";
import { defineAction } from "astro:actions";
// import { z } from 'astro:schema';

export const server = {
  getAllUsers: defineAction({
    async handler() {
      try {
        // throw new Error("SIMULATED SER")
        const users = await prisma.user.findMany({});
        return { data: users };
      } catch (error) {
        return { error: "An error occurred"};
      }
    },
  }),
};
