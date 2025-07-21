-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "delivered" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "deliveredAt" TIMESTAMP(3),
ADD COLUMN     "viewedAt" TIMESTAMP(3);
