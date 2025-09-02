/*
  Warnings:

  - You are about to drop the `TicketPurchase` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PurchaseStatus" AS ENUM ('PENDING', 'VERIFIED');

-- DropForeignKey
ALTER TABLE "TicketPurchase" DROP CONSTRAINT "TicketPurchase_ticketId_fkey";

-- AlterTable
ALTER TABLE "Raffle" ALTER COLUMN "drawDate" SET DEFAULT (now() + interval '15 days');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "tiktok" TEXT,
ADD COLUMN     "whatsapp" TEXT;

-- DropTable
DROP TABLE "TicketPurchase";

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "buyerName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "state" TEXT,
    "proofUrl" TEXT NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ticketId" TEXT NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE;
