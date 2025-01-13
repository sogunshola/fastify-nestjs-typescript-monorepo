import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { env } from '@monorepo/shared';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JWTGuard } from '../../guards/auth.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: env.jwtSecret,
      signOptions: {
        expiresIn: env.expiresIn,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JWTGuard,
    },
  ],
})
export class AuthModule {}
