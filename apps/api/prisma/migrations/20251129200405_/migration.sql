-- AlterTable
ALTER TABLE "Bingo" ALTER COLUMN "drawDate" SET DEFAULT (now() + '30 minutes'::interval);
