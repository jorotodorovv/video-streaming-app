-- CreateTable
CREATE TABLE "VideoEntity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "videoId" TEXT,
    "title" TEXT,
    "description" TEXT,
    "image" TEXT,
    "views" TEXT,
    "likes" TEXT,
    "token" TEXT
);
