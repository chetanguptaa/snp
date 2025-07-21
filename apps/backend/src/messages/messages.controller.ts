import { Controller, Get, Param, Req } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(':userId')
  async getConversation(@Param('userId') userId: string, @Req() req) {
    return this.messagesService.getConversation(req.user.id, userId);
  }

  @Get('unread/:fromUserId')
  async getUnread(@Param('fromUserId') fromUserId: string, @Req() req) {
    return this.messagesService.getUnreadMessages(req.user.id, fromUserId);
  }
}
