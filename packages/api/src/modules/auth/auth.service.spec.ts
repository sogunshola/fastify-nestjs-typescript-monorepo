import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { Helper } from '@monorepo/shared';
import { User } from '@prisma/client';

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {},
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should return user and token if credentials are valid', async () => {
    const loginDto = { email: 'test@example.com', password: 'password' };
    const user = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashedPassword',
      createdAt: new Date(),
      updatedAt: new Date(),
      roles: [],
      avatar: null,
    };
    const token = 'jwtToken';

    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);
    jest.spyOn(Helper, 'compare').mockResolvedValue(true);
    jest.spyOn(jwtService, 'sign').mockReturnValue(token);

    const result = await authService.signIn(loginDto);

    expect(result).toEqual({ user, token });
    expect(prismaService.user.findUnique).toHaveBeenCalledWith({
      where: { email: loginDto.email },
      select: { id: true, email: true, password: true },
    });
    expect(Helper.compare).toHaveBeenCalledWith(
      loginDto.password,
      user.password,
    );
    expect(jwtService.sign).toHaveBeenCalledWith({ id: user.id });
  });

  it('should throw UnauthorizedException if user is not found', async () => {
    const loginDto = { email: 'test@example.com', password: 'password' };

    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

    await expect(authService.signIn(loginDto)).rejects.toThrow(
      UnauthorizedException,
    );
    expect(prismaService.user.findUnique).toHaveBeenCalledWith({
      where: { email: loginDto.email },
      select: { id: true, email: true, password: true },
    });
  });

  it('should throw UnauthorizedException if password does not match', async () => {
    const loginDto = { email: 'test@example.com', password: 'password' };
    const user: User = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashedPassword',
      createdAt: new Date(),
      updatedAt: new Date(),
      roles: [],
      avatar: null,
    };

    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);
    jest.spyOn(Helper, 'compare').mockResolvedValue(false);

    await expect(authService.signIn(loginDto)).rejects.toThrow(
      UnauthorizedException,
    );
    expect(prismaService.user.findUnique).toHaveBeenCalledWith({
      where: { email: loginDto.email },
      select: { id: true, email: true, password: true },
    });
    expect(Helper.compare).toHaveBeenCalledWith(
      loginDto.password,
      user.password,
    );
  });

  it('should throw UnauthorizedException if an error occurs', async () => {
    const loginDto = { email: 'test@example.com', password: 'password' };

    jest
      .spyOn(prismaService.user, 'findUnique')
      .mockRejectedValue(new Error('Some error'));

    await expect(authService.signIn(loginDto)).rejects.toThrow(
      UnauthorizedException,
    );
    expect(prismaService.user.findUnique).toHaveBeenCalledWith({
      where: { email: loginDto.email },
      select: { id: true, email: true, password: true },
    });
  });
});
