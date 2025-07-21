import { BadRequestException, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { loginSchema, registerSchema } from './schemas';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Req() req: Request) {
    const body = req.body;
    const parsed = await registerSchema.safeParseAsync(body);
    if (parsed.error) {
      throw new BadRequestException('Invalid request body');
    }
    return this.authService.register(
      parsed.data.email,
      parsed.data.password,
      parsed.data.username,
      parsed.data.name,
    );
  }

  @Post('login')
  async login(@Req() req: Request) {
    const body = req.body;
    const parsed = await loginSchema.safeParseAsync(body);
    if (parsed.error) {
      throw new BadRequestException('Invalid request body');
    }
    return this.authService.login(parsed.data.email, parsed.data.password);
  }
}
