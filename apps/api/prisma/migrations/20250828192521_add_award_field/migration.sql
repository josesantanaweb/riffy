/*
  Warnings:

  - You are about to drop the column `logo` on the `Raffle` table. All the data in the column will be lost.
  - Added the required column `award` to the `Raffle` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RaffleStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING', 'COMPLETED');

-- AlterTable
ALTER TABLE "Raffle" DROP COLUMN "logo",
ADD COLUMN     "award" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" "RaffleStatus" NOT NULL DEFAULT 'ACTIVE',
ALTER COLUMN "drawDate" SET DEFAULT (now() + interval '15 days');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT;
