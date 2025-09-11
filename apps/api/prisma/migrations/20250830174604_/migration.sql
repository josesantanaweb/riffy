/*
  Warnings:

  - You are about to drop the column `primaryColor` on the `Raffle` table. All the data in the column will be lost.
  - You are about to drop the column `secondaryColor` on the `Raffle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Raffle" DROP COLUMN "primaryColor",
DROP COLUMN "secondaryColor",
ALTER COLUMN "drawDate" SET DEFAULT (now() + interval '15 days');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "primaryColor" TEXT DEFAULT '00D4FF';
