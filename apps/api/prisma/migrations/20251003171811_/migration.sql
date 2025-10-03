-- DropEnum
DROP TYPE "SubscriptionStatus";

-- CreateTable
CREATE TABLE "PlanUsage" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "currentRaffles" INTEGER NOT NULL DEFAULT 0,
    "currentTickets" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanUsage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlanUsage_ownerId_key" ON "PlanUsage"("ownerId");

-- AddForeignKey
ALTER TABLE "PlanUsage" ADD CONSTRAINT "PlanUsage_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanUsage" ADD CONSTRAINT "PlanUsage_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
