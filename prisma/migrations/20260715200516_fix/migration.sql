/*
  Warnings:

  - The `order` column on the `SocialLink` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[platform]` on the table `SocialLink` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Education" ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "SkillCategory" ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "SocialLink" ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "icon" DROP NOT NULL,
DROP COLUMN "order",
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Technology" ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "icon" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Tool" ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "heading" ALTER COLUMN "icon" DROP NOT NULL;

-- AlterTable
ALTER TABLE "hero" ALTER COLUMN "greeting" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SocialLink_platform_key" ON "SocialLink"("platform");
