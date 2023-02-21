-- CreateTable
CREATE TABLE "User" (
    "dni" INTEGER NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("dni")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_dni_key" ON "User"("dni");
