/*
  Warnings:

  - You are about to drop the column `description` on the `SiteConfig` table. All the data in the column will be lost.
  - Added the required column `aboutDescription` to the `SiteConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `greeting` to the `SiteConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heroDescription` to the `SiteConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `SiteConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `SiteConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passion` to the `SiteConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `SiteConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `SiteConfig` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SiteConfig" DROP COLUMN "description",
ADD COLUMN     "aboutDescription" TEXT NOT NULL,
ADD COLUMN     "experience" INTEGER,
ADD COLUMN     "greeting" TEXT NOT NULL,
ADD COLUMN     "happyClients" INTEGER,
ADD COLUMN     "heroDescription" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "passion" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "titleLine" TEXT[],
ADD COLUMN     "totalProjects" INTEGER;
