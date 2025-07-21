import { Injectable } from '@nestjs/common';
import prisma from '@repo/database';

@Injectable()
export class UsersService {
  constructor() {}

  findAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        username: true,
        avatarUrl: true,
      },
    });
  }
}
