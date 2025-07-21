import { Injectable } from '@nestjs/common';
import prisma from '@repo/database';

@Injectable()
export class MessagesService {
  constructor() {}

  async getConversation(userId: string, otherUserId: string) {
    return prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: userId },
        ],
      },
      orderBy: { sentAt: 'asc' },
    });
  }

  async getUnreadMessages(userId: string, fromUserId: string) {
    const unread = await prisma.message.findMany({
      where: {
        senderId: fromUserId,
        receiverId: userId,
        viewed: false,
      },
    });
    await prisma.message.updateMany({
      where: {
        senderId: fromUserId,
        receiverId: userId,
        viewed: false,
      },
      data: { viewed: true },
    });
    return unread;
  }
}
