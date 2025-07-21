import { z } from 'zod';

export const addFriendSchema = z.object({
  friendId: z.cuid(),
});

export type TAddFriend = z.infer<typeof addFriendSchema>;

export const acceptFriendRequest = z.object({
  senderId: z.cuid(),
});

export type TAcceptFriend = z.infer<typeof acceptFriendRequest>;
