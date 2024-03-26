/*
  Warnings:

  - The primary key for the `UserWatchedClasses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserWatchedClasses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserWatchedClasses" DROP CONSTRAINT "UserWatchedClasses_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserWatchedClasses_pkey" PRIMARY KEY ("userId", "classId");
