/*
  Warnings:

  - The values [INACTIVE] on the enum `RaffleStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RaffleStatus_new" AS ENUM ('ACTIVE', 'PENDING', 'COMPLETED');
ALTER TABLE "Raffle" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Raffle" ALTER COLUMN "status" TYPE "RaffleStatus_new" USING ("status"::text::"RaffleStatus_new");
ALTER TYPE "RaffleStatus" RENAME TO "RaffleStatus_old";
ALTER TYPE "RaffleStatus_new" RENAME TO "RaffleStatus";
DROP TYPE "RaffleStatus_old";
ALTER TABLE "Raffle" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- DropForeignKey
ALTER TABLE "Raffle" DROP CONSTRAINT "Raffle_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_raffleId_fkey";

-- DropForeignKey
ALTER TABLE "TicketPurchase" DROP CONSTRAINT "TicketPurchase_ticketId_fkey";

-- AlterTable
ALTER TABLE "Raffle" ALTER COLUMN "drawDate" SET DEFAULT (now() + interval '15 days');

-- AddForeignKey
ALTER TABLE "Raffle" ADD CONSTRAINT "Raffle_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_raffleId_fkey" FOREIGN KEY ("raffleId") REFERENCES "Raffle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketPurchase" ADD CONSTRAINT "TicketPurchase_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE;
