-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_authorUserId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_projectId_fkey";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "startDate" SET DATA TYPE TEXT,
ALTER COLUMN "dueDate" SET DATA TYPE TEXT,
ALTER COLUMN "projectId" DROP NOT NULL,
ALTER COLUMN "authorUserId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_authorUserId_fkey" FOREIGN KEY ("authorUserId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
