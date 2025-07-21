import { z } from 'zod';

const usernameRegex = /^[a-zA-Z0-9_-]+$/;

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
  name: z.string().min(1),
  username: z.string().min(3).max(20).regex(usernameRegex, {
    message:
      'Username can only contain letters, numbers, underscores, and dashes',
  }),
});

export type TRegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
