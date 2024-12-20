/*
  Warnings:

  - Added the required column `position` to the `new` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "new" ADD COLUMN     "position" INTEGER NOT NULL;
