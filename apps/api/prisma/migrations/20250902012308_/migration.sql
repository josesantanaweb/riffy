-- AlterEnum
ALTER TYPE "PurchaseStatus" ADD VALUE 'DENIED';

-- AlterTable
ALTER TABLE "Raffle" ALTER COLUMN "drawDate" SET DEFAULT (now() + interval '15 days');
