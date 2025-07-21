-- CreateEnum
CREATE TYPE "FriendshipStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "Friend" ADD COLUMN     "status" "FriendshipStatus" NOT NULL DEFAULT 'PENDING';
