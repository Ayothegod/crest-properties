import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const adapter = new PrismaAdapter(prisma.session, prisma.user);