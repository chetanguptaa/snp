import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import prisma from '@repo/database';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  async register(
    email: string,
    password: string,
    username: string,
    name: string,
  ) {
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, username, password: hashed, name },
    });
    return this._generateToken(user.id);
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');
    return this._generateToken(user.id);
  }

  private _generateToken(userId: string) {
    const accessToken = this.jwt.sign({ sub: userId });
    return { accessToken };
  }
}
