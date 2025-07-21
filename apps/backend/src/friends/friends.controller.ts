import {
  Controller,
  Post,
  Get,
  Req,
  UseGuards,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { AuthGuard } from '@nestjs/passport';
import { acceptFriendRequest, addFriendSchema } from './schemas';
import prisma from '@repo/database';

@Controller('friends')
@UseGuards(AuthGuard('jwt'))
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @Post()
  async addFriend(@Req() req: any) {
    const bodyRes = await addFriendSchema.safeParseAsync(req.body);
    if (bodyRes.error) {
      throw new BadRequestException('Invalid request body');
    }
    return this.friendsService.addFriend(req.user.id, bodyRes.data.friendId);
  }

  @Get()
  getFriends(@Req() req) {
    return this.friendsService.getFriends(req.user.id);
  }

  @Post('accept')
  async acceptRequest(@Req() req: any) {
    const bodyRes = await acceptFriendRequest.safeParseAsync(req.body);
    if (bodyRes.error) {
      throw new BadRequestException('Invalid request body');
    }
    const receiverId = req.user.id;
    const senderId = bodyRes.data.senderId;
    const existingRequest = await prisma.friend.findUnique({
      where: {
        userId_friendId: {
          userId: senderId,
          friendId: receiverId,
        },
      },
    });
    if (!existingRequest || existingRequest.status !== 'PENDING') {
      throw new NotFoundException('No pending request from this user');
    }
    await prisma.$transaction([
      prisma.friend.update({
        where: {
          userId_friendId: {
            userId: senderId,
            friendId: receiverId,
          },
        },
        data: {
          status: 'ACCEPTED',
        },
      }),
      prisma.friend.create({
        data: {
          userId: receiverId,
          friendId: senderId,
          status: 'ACCEPTED',
        },
      }),
    ]);
    return {
      message: 'Friend request accepted',
    };
  }
}
