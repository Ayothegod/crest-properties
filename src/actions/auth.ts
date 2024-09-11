import { prisma } from '@/lib/prisma';
import { defineAction } from 'astro:actions';

export const user = {
  createUser: defineAction({
    // input: {},
    handler(input, context) {
      
    },
  }),
  // getUser: defineAction(/* ... */),
}