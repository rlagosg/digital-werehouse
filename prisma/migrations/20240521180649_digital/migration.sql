-- AlterTable
ALTER TABLE "Banks" ALTER COLUMN "internalAccount" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Documents" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Folders" ALTER COLUMN "description" DROP NOT NULL;
