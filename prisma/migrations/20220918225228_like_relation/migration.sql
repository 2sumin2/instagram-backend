-- CreateTable
CREATE TABLE "_LikeRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LikeRelation_AB_unique" ON "_LikeRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_LikeRelation_B_index" ON "_LikeRelation"("B");

-- AddForeignKey
ALTER TABLE "_LikeRelation" ADD CONSTRAINT "_LikeRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikeRelation" ADD CONSTRAINT "_LikeRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
