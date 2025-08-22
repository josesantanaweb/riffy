/*
  Warnings:

  - Made the column `banner` on table `Raffle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `logo` on table `Raffle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `primaryColor` on table `Raffle` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Raffle" ALTER COLUMN "banner" SET NOT NULL,
ALTER COLUMN "logo" SET NOT NULL,
ALTER COLUMN "primaryColor" SET NOT NULL,
ALTER COLUMN "primaryColor" SET DEFAULT '00D4FF',
ALTER COLUMN "totalTickets" SET DEFAULT 100,
ALTER COLUMN "drawDate" SET DEFAULT (now() + interval '15 days');

-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "number" SET DATA TYPE TEXT;
