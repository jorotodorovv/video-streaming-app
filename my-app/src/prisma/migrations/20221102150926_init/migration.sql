-- CreateTable
CREATE TABLE "VideoEntity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "videoId" TEXT,
    "title" TEXT,
    "description" TEXT,
    "image" TEXT,
    "views" TEXT,
    "likes" TEXT,
    "tokenId" INTEGER NOT NULL,
    CONSTRAINT "VideoEntity_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "TokenEntity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TokenEntity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "currentToken" TEXT,
    "nextToken" TEXT
);
