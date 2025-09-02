/*
  Warnings:

  - A unique constraint covering the columns `[ticketId]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Raffle" ALTER COLUMN "drawDate" SET DEFAULT (now() + interval '15 days');

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_ticketId_key" ON "Purchase"("ticketId");
