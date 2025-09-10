/*
  Warnings:

  - A unique constraint covering the columns `[domain]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Raffle" ALTER COLUMN "drawDate" SET DEFAULT (now() + interval '15 days');

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "domain" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "User_domain_key" ON "User"("domain");
