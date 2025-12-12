import { PrismaClient } from '@prisma/client';

/**
 * Prisma client singleton instance
 * Prevents multiple instances in development with hot-reload
 */
declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
