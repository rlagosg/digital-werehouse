/*
  Warnings:

  - You are about to drop the `Bank` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Document` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Folder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Voucher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VoucherFolder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_scanDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_scanDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "Voucher" DROP CONSTRAINT "Voucher_bankId_fkey";

-- DropForeignKey
ALTER TABLE "Voucher" DROP CONSTRAINT "Voucher_documentId_fkey";

-- DropForeignKey
ALTER TABLE "Voucher" DROP CONSTRAINT "Voucher_folderId_fkey";

-- DropForeignKey
ALTER TABLE "VoucherFolder" DROP CONSTRAINT "VoucherFolder_folderId_fkey";

-- DropTable
DROP TABLE "Bank";

-- DropTable
DROP TABLE "Document";

-- DropTable
DROP TABLE "Folder";

-- DropTable
DROP TABLE "Voucher";

-- DropTable
DROP TABLE "VoucherFolder";

-- CreateTable
CREATE TABLE "Folders" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "folderType" "FoldersTypes" NOT NULL,
    "scanDetailsId" TEXT NOT NULL,

    CONSTRAINT "Folders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoucherFolders" (
    "id" TEXT NOT NULL,
    "folderId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "firstVoucher" INTEGER NOT NULL,
    "lastVoucher" INTEGER NOT NULL,

    CONSTRAINT "VoucherFolders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documents" (
    "id" TEXT NOT NULL,
    "scanDetailsId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pages" INTEGER NOT NULL,
    "pdfPath" TEXT NOT NULL,
    "documentType" "FoldersTypes" NOT NULL,

    CONSTRAINT "Documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Banks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "internalAccount" TEXT NOT NULL,

    CONSTRAINT "Banks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vouchers" (
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

    CONSTRAINT "Vouchers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Folders_name_key" ON "Folders"("name");

-- AddForeignKey
ALTER TABLE "Folders" ADD CONSTRAINT "Folders_scanDetailsId_fkey" FOREIGN KEY ("scanDetailsId") REFERENCES "ScanDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoucherFolders" ADD CONSTRAINT "VoucherFolders_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_scanDetailsId_fkey" FOREIGN KEY ("scanDetailsId") REFERENCES "ScanDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vouchers" ADD CONSTRAINT "Vouchers_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "VoucherFolders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vouchers" ADD CONSTRAINT "Vouchers_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Documents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vouchers" ADD CONSTRAINT "Vouchers_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "Banks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
