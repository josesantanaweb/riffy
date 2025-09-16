-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "amount" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Raffle" ALTER COLUMN "drawDate" SET DEFAULT (now() + interval '15 days');
