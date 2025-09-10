-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "nationalId" TEXT;

-- AlterTable
ALTER TABLE "Raffle" ALTER COLUMN "drawDate" SET DEFAULT (now() + interval '15 days');
