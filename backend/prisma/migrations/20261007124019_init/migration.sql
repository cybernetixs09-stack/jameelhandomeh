-- CreateTable
CREATE TABLE "WaitingParty" (
    "id" TEXT NOT NULL,
    "ticket" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "partySize" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WaitingParty_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WaitingParty_ticket_key" ON "WaitingParty"("ticket");

-- CreateIndex
CREATE INDEX "WaitingParty_createdAt_idx" ON "WaitingParty"("createdAt");
