-- AlterTable
ALTER TABLE "Raffle" ADD COLUMN     "minTickets" INTEGER DEFAULT 2,
ADD COLUMN     "showDate" BOOLEAN DEFAULT true,
ADD COLUMN     "showProgress" BOOLEAN DEFAULT true;
