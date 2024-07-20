/*
  Warnings:

  - You are about to drop the column `description` on the `Documents` table. All the data in the column will be lost.
  - You are about to drop the column `documentType` on the `Documents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Documents" DROP COLUMN "description",
DROP COLUMN "documentType";
