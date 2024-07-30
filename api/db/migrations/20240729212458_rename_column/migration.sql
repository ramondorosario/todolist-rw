/*
  Warnings:

  - You are about to drop the column `concluded` on the `tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "concluded",
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false;
