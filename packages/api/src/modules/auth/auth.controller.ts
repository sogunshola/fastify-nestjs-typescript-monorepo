import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { LoginDto } from './auth.dto';
import {
  CurrentUser,
  Public,
  resolveResponse,
  sendObjectResponse,
} from '@monorepo/shared';
import { User } from '@prisma/client';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  async login(@Body() loginDto: LoginDto) {
    return resolveResponse(this.authService.signIn(loginDto), 'Login Success');
  }

  @ApiBearerAuth()
  @Get('me')
  validateToken(@CurrentUser() user: User) {
    return sendObjectResponse(user, 'Token is valid');
  }
}
