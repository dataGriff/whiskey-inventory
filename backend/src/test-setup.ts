import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const cleanupDatabase = async () => {
  await prisma.whiskey.deleteMany({});
};

export const disconnectDatabase = async () => {
  await prisma.$disconnect();
};

export { prisma };
