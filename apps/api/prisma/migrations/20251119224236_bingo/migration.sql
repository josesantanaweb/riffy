/*
  Warnings:

  - You are about to drop the column `raffleId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `maxRaffles` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `maxTickets` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `currentRaffles` on the `PlanUsage` table. All the data in the column will be lost.
  - You are about to drop the column `currentTickets` on the `PlanUsage` table. All the data in the column will be lost.
  - You are about to drop the `Raffle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ticket` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "BingoStatus" AS ENUM ('ACTIVE', 'PENDING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "BoardStatus" AS ENUM ('AVAILABLE', 'SOLD', 'PREMIUM', 'WINNER', 'LOSER');

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_raffleId_fkey";

-- DropForeignKey
ALTER TABLE "Raffle" DROP CONSTRAINT "Raffle_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_raffleId_fkey";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "raffleId",
ADD COLUMN     "bingoId" TEXT;

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "maxRaffles",
DROP COLUMN "maxTickets",
ADD COLUMN     "maxBingos" INTEGER DEFAULT 0,
ADD COLUMN     "maxBoards" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "PlanUsage" DROP COLUMN "currentRaffles",
DROP COLUMN "currentTickets",
ADD COLUMN     "currentBingos" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "currentBoards" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Raffle";

-- DropTable
DROP TABLE "Ticket";

-- DropEnum
DROP TYPE "RaffleStatus";

-- DropEnum
DROP TYPE "TicketStatus";

-- CreateTable
CREATE TABLE "Bingo" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "totalBoards" INTEGER NOT NULL DEFAULT 100,
    "price" DOUBLE PRECISION NOT NULL,
    "drawDate" TIMESTAMP(3) NOT NULL DEFAULT (now() + '30 minutes'::interval),
    "showDate" BOOLEAN DEFAULT true,
    "showProgress" BOOLEAN DEFAULT true,
    "minBoards" INTEGER DEFAULT 2,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" TEXT NOT NULL,
    "award" DOUBLE PRECISION NOT NULL,
    "drawnNumbers" INTEGER[],
    "status" "BingoStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "Bingo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Board" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "status" "BoardStatus" NOT NULL DEFAULT 'AVAILABLE',
    "bingoId" TEXT NOT NULL,
    "paymentId" TEXT,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bingo" ADD CONSTRAINT "Bingo_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_bingoId_fkey" FOREIGN KEY ("bingoId") REFERENCES "Bingo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_bingoId_fkey" FOREIGN KEY ("bingoId") REFERENCES "Bingo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
