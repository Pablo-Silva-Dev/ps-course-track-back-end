-- DropForeignKey
ALTER TABLE "Commentary" DROP CONSTRAINT "Commentary_courseId_fkey";

-- DropForeignKey
ALTER TABLE "UserWatchedClasses" DROP CONSTRAINT "UserWatchedClasses_classId_fkey";

-- AddForeignKey
ALTER TABLE "Commentary" ADD CONSTRAINT "Commentary_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWatchedClasses" ADD CONSTRAINT "UserWatchedClasses_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;
