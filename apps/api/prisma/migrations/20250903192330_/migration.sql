/*
  Warnings:

  - You are about to drop the column `paymentMethodType` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `binanceEmail` on the `PaymentMethod` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "paymentMethodType",
ADD COLUMN     "paymentMethod" TEXT;

-- AlterTable
ALTER TABLE "PaymentMethod" DROP COLUMN "binanceEmail";

-- AlterTable
ALTER TABLE "Raffle" ALTER COLUMN "drawDate" SET DEFAULT (now() + interval '15 days');
