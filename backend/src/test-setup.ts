import prisma from './db/prisma';

export const cleanupDatabase = async () => {
  await prisma.whiskey.deleteMany({});
};

export const disconnectDatabase = async () => {
  await prisma.$disconnect();
};

export { prisma };
