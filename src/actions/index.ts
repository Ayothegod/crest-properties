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

// const getAllUsers = async () => {
//   const { data, error } = await actions.getAllUsers();

//   if (data) {
//     // This handles when data is successfully fetched
//     console.log("Users:", data.data);
//     return { data: data.data, error: null };
//   }

//   if (error) {
//     // Handles the case where there's an error
//     console.log("Error:", error);
//     return { data: null, error: error };
//   }

//   // Handles the case where no data or error is returned
//   return { data: null, error: "Unknown error" };
// };

