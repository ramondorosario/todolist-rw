-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "concluded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false;
