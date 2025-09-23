-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "email" TEXT,
ALTER COLUMN "paymentDate" DROP DEFAULT;
