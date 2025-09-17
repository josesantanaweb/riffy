/*
  Warnings:

  - You are about to drop the column `ticketId` on the `Payment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_ticketId_fkey";

-- DropIndex
DROP INDEX "Payment_ticketId_key";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "ticketId";

-- AlterTable
ALTER TABLE "Raffle" ALTER COLUMN "drawDate" SET DEFAULT (now() + interval '15 days');

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "paymentId" TEXT;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
