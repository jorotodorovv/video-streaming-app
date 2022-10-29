-- CreateTable
CREATE TABLE "Video" (
    "id" INTEGER NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "image" TEXT,
    "views" TEXT,
    "likes" TEXT,
    "token" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Video_id_key" ON "Video"("id");
