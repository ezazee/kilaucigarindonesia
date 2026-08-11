/*
  Warnings:

  - You are about to drop the column `content` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `shortDesc` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `strength` on the `Product` table. All the data in the column will be lost.
  - Added the required column `contentEn` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentId` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleEn` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleId` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionEn` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameEn` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescEn` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Page" DROP COLUMN "content",
DROP COLUMN "title",
ADD COLUMN     "contentEn" JSONB NOT NULL,
ADD COLUMN     "contentId" JSONB NOT NULL,
ADD COLUMN     "titleEn" TEXT NOT NULL,
ADD COLUMN     "titleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "description",
DROP COLUMN "name",
DROP COLUMN "shortDesc",
DROP COLUMN "strength",
ADD COLUMN     "descriptionEn" TEXT NOT NULL,
ADD COLUMN     "descriptionId" TEXT NOT NULL,
ADD COLUMN     "nameEn" TEXT NOT NULL,
ADD COLUMN     "nameId" TEXT NOT NULL,
ADD COLUMN     "shortDescEn" TEXT NOT NULL,
ADD COLUMN     "shortDescId" TEXT NOT NULL,
ADD COLUMN     "strengthEn" TEXT,
ADD COLUMN     "strengthId" TEXT;
