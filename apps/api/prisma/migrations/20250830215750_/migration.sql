/*
  Warnings:

  - You are about to drop the column `primaryColor` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Raffle" ALTER COLUMN "drawDate" SET DEFAULT (now() + interval '15 days');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "primaryColor",
ADD COLUMN     "brandColor" TEXT DEFAULT '00D4FF';
