-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'MANAGER', 'SUBADMIN', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'User';
