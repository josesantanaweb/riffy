-- CreateEnum
CREATE TYPE "DrawMode" AS ENUM ('MANUAL', 'RANDOM', 'BOTH');

-- AlterTable
ALTER TABLE "Raffle" ADD COLUMN     "drawMode" "DrawMode" NOT NULL DEFAULT 'RANDOM';
