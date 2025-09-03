/*
  Warnings:

  - You are about to drop the `Purchase` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'VERIFIED', 'DENIED');

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_ticketId_fkey";

-- AlterTable
ALTER TABLE "Raffle" ALTER COLUMN "drawDate" SET DEFAULT (now() + interval '15 days');

-- DropTable
DROP TABLE "Purchase";

-- DropEnum
DROP TYPE "PurchaseStatus";

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "buyerName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "state" TEXT,
    "proofUrl" TEXT NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ticketId" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_ticketId_key" ON "Payment"("ticketId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE;
