-- CreateTable
CREATE TABLE "Kilpailija" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nimi" TEXT NOT NULL,
    "pisteet" INTEGER NOT NULL,
    "peliId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Peli" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nimi" TEXT NOT NULL,
    "kierrokset" INTEGER NOT NULL,
    "pvm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
