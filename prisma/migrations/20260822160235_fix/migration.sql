/*
  Warnings:

  - You are about to drop the `About` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hero` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `SiteConfig` will be added. If there are existing duplicate values, this will fail.

*/
-- DropTable
DROP TABLE "About";

-- DropTable
DROP TABLE "hero";

-- CreateIndex
CREATE UNIQUE INDEX "SiteConfig_email_key" ON "SiteConfig"("email");
