-- CreateEnum
CREATE TYPE "PlanUsageStatus" AS ENUM ('ACTIVE', 'EXHAUSTED', 'UNLIMITED');

-- AlterTable
ALTER TABLE "PlanUsage" ADD COLUMN     "status" "PlanUsageStatus" NOT NULL DEFAULT 'ACTIVE';
