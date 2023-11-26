/*
  Warnings:

  - You are about to drop the column `profileImgUrl` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profileImgUrl",
ADD COLUMN     "profileIamgeUrl" VARCHAR(255),
ALTER COLUMN "createdAt" SET DEFAULT NOW(),
ALTER COLUMN "updatedAt" DROP DEFAULT;
