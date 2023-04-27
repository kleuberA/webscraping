-- CreateTable
CREATE TABLE "Quote" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);
