-- CreateTable
CREATE TABLE "Whiskey" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "distillery" TEXT,
    "region" TEXT,
    "age" INTEGER,
    "abv" DOUBLE PRECISION,
    "size_ml" INTEGER,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "purchaseDate" TIMESTAMP(3),
    "priceCents" INTEGER,
    "notes" TEXT,
    "imageUrl" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "rating" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Whiskey_pkey" PRIMARY KEY ("id")
);
