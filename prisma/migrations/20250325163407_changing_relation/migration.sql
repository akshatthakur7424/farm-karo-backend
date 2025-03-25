-- DropForeignKey
ALTER TABLE "Assets" DROP CONSTRAINT "Assets_userId_fkey";

-- AddForeignKey
ALTER TABLE "Assets" ADD CONSTRAINT "Assets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
