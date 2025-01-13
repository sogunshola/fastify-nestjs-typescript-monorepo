import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthPayload, LoginDto } from './auth.dto';
import { Helper } from '@monorepo/shared';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async signIn(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;
      const user = await this.prisma.user.findUnique({
        where: { email },
        select: { id: true, email: true, password: true },
      });
      const isPasswordMatch = await Helper.compare(password, user.password);
      if (user && isPasswordMatch) {
        delete user.password;
        const payload: AuthPayload = { id: user.id };
        const token = this.jwtService.sign(payload);
        return { user, token };
      }
      throw new UnauthorizedException('Invalid Credentials');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }
}
