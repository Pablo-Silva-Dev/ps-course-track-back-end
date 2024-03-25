-- CreateTable
CREATE TABLE "UserWatchedClasses" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "watchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserWatchedClasses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserWatchedClasses" ADD CONSTRAINT "UserWatchedClasses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWatchedClasses" ADD CONSTRAINT "UserWatchedClasses_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
