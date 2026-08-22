/*
  Warnings:

  - Added the required column `imagePublicId` to the `SiteConfig` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SiteConfig" ADD COLUMN     "cvPublicId" TEXT,
ADD COLUMN     "imagePublicId" TEXT NOT NULL,
ADD COLUMN     "resumePublicId" TEXT;
