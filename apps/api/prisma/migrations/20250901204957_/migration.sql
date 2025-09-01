/*
  Warnings:

  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `User` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "TicketStatus" ADD VALUE 'WINNER';
ALTER TYPE "TicketStatus" ADD VALUE 'LOSER';

-- AlterTable
ALTER TABLE "Raffle" ALTER COLUMN "drawDate" SET DEFAULT (now() + interval '15 days');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "image",
DROP COLUMN "state",
ADD COLUMN     "logo" TEXT;
