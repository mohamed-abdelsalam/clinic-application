/*
  Warnings:

  - Added the required column `strengthValue` to the `Instruction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Instruction" ADD COLUMN     "group" INTEGER,
ADD COLUMN     "strengthValue" TEXT NOT NULL;
