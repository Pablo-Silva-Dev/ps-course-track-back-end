/*
  Warnings:

  - Made the column `cover_url` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cover_url` on table `Module` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "cover_url" SET NOT NULL;

-- AlterTable
ALTER TABLE "Module" ALTER COLUMN "cover_url" SET NOT NULL;
