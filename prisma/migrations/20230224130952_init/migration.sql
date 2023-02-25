/*
  Warnings:

  - Added the required column `comment` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastLogin` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastlogout` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "comment" TEXT NOT NULL,
ADD COLUMN     "lastLogin" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "lastlogout" TIMESTAMP(3) NOT NULL;
