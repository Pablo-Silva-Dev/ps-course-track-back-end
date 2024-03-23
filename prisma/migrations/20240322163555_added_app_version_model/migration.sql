-- CreateTable
CREATE TABLE "AppVersion" (
    "id" TEXT NOT NULL,
    "appVersion" TEXT NOT NULL,
    "availableOniOS" BOOLEAN NOT NULL,
    "availableOnAndroid" BOOLEAN NOT NULL,

    CONSTRAINT "AppVersion_pkey" PRIMARY KEY ("id")
);
