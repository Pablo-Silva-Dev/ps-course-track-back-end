-- DropForeignKey
ALTER TABLE "Commentary" DROP CONSTRAINT "Commentary_classId_fkey";

-- DropForeignKey
ALTER TABLE "Commentary" DROP CONSTRAINT "Commentary_userId_fkey";

-- AddForeignKey
ALTER TABLE "Commentary" ADD CONSTRAINT "Commentary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commentary" ADD CONSTRAINT "Commentary_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;
