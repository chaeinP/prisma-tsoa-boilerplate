import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resetPostgres = async () => {
  await prisma.$transaction([prisma.user.deleteMany()]);
};
