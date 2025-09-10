-- DropIndex
DROP INDEX "User_domain_key";

-- AlterTable
ALTER TABLE "Raffle" ALTER COLUMN "drawDate" SET DEFAULT (now() + interval '15 days');
