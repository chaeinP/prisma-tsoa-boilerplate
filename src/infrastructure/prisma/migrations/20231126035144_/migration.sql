/*
  Warnings:

  - You are about to drop the column `profileIamgeUrl` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profileIamgeUrl",
ADD COLUMN     "profileImageUrl" VARCHAR(255),
ALTER COLUMN "createdAt" SET DEFAULT NOW();
