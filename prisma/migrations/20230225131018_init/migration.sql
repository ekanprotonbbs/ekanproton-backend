/*
  Warnings:

  - You are about to drop the column `lastLogin` on the `User` table. All the data in the column will be lost.
  - Added the required column `lastLogin` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastUpdate` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastLogin",
ADD COLUMN     "lastLogin" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "lastUpdate" TIMESTAMP(3) NOT NULL;
