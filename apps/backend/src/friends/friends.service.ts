import { Injectable } from '@nestjs/common';
import prisma from '@repo/database';

@Injectable()
export class FriendsService {
  constructor() {}
  async addFriend(userId: string, friendId: string) {
    if (userId === friendId) throw new Error("Can't friend yourself");
    const existing = await prisma.friend.findUnique({
      where: {
        userId_friendId: {
          userId,
          friendId,
        },
      },
    });
    if (existing) return existing;
    return prisma.friend.create({
      data: {
        userId,
        friendId,
      },
    });
  }

  async getFriends(userId: string) {
    const friends = await prisma.friend.findMany({
      where: { userId },
      include: {
        friend: {
          select: { id: true, username: true, avatarUrl: true },
        },
      },
    });
    return friends.map((f) => f.friend);
  }
}
