-- CreateEnum
CREATE TYPE "FoldersTypes" AS ENUM ('voucher');

-- CreateTable
CREATE TABLE "ScanDetails" (
    "id" TEXT NOT NULL,
    "scanEntryDate" TIMESTAMP(3) NOT NULL,
    "scanExitDate" TIMESTAMP(3) NOT NULL,
    "observations" TEXT NOT NULL,

    CONSTRAINT "ScanDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Folder" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "folderType" "FoldersTypes" NOT NULL,
    "scanDetailsId" TEXT NOT NULL,

    CONSTRAINT "Folder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoucherFolder" (
    "id" TEXT NOT NULL,
    "folderId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "firstVoucher" INTEGER NOT NULL,
    "lastVoucher" INTEGER NOT NULL,

    CONSTRAINT "VoucherFolder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "scanDetailsId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pages" INTEGER NOT NULL,
    "pdfPath" TEXT NOT NULL,
    "documentType" "FoldersTypes" NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bank" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "internalAccount" TEXT NOT NULL,

    CONSTRAINT "Bank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voucher" (
    "id" TEXT NOT NULL,
    "check" INTEGER NOT NULL,
    "folderId" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "bankId" TEXT NOT NULL,
    "checkDate" TIMESTAMP(3) NOT NULL,
    "checkValue" DOUBLE PRECISION NOT NULL,
    "beneficiary" TEXT NOT NULL,
    "proyects" TEXT NOT NULL,
    "isNull" BOOLEAN NOT NULL,
    "nullDate" TIMESTAMP(3),

    CONSTRAINT "Voucher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Folder_name_key" ON "Folder"("name");

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_scanDetailsId_fkey" FOREIGN KEY ("scanDetailsId") REFERENCES "ScanDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoucherFolder" ADD CONSTRAINT "VoucherFolder_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_scanDetailsId_fkey" FOREIGN KEY ("scanDetailsId") REFERENCES "ScanDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "VoucherFolder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "Bank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
