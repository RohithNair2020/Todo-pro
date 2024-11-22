-- DropForeignKey
ALTER TABLE "todos" DROP CONSTRAINT "todos_projectId_fkey";

-- AddForeignKey
ALTER TABLE "todos" ADD CONSTRAINT "todos_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
