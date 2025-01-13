import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Helper, AppEventConstants } from '@monorepo/shared';
import { User } from '@prisma/client';

jest.mock('@monorepo/shared', () => ({
  Helper: {
    hash: jest.fn(),
  },
  AppEventConstants: {
    USER_CREATED: 'user.created',
  },
}));

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('should create a new user successfully', async () => {
    const payload: CreateUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };
    const hashedPassword = 'hashedPassword123';
    const user: User = {
      id: 1,
      email: payload.email,
      password: hashedPassword,
      name: null,
      avatar: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      roles: [],
    };

    jest.spyOn(service, 'checkUniqueEmail').mockResolvedValue(undefined);
    (Helper.hash as jest.Mock).mockResolvedValue(hashedPassword);
    (prisma.user.create as jest.Mock).mockResolvedValue(user);

    const result = await service.create(payload);

    expect(service.checkUniqueEmail).toHaveBeenCalledWith(payload.email);
    expect(Helper.hash).toHaveBeenCalledWith(payload.password);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        ...payload,
        password: hashedPassword,
      },
    });
    expect(eventEmitter.emit).toHaveBeenCalledWith(
      AppEventConstants.USER_CREATED,
      user,
    );
    expect(result).toEqual(user);
  });

  it('should throw BadRequestException if email already exists', async () => {
    const payload: CreateUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };

    jest.spyOn(service, 'checkUniqueEmail').mockImplementation(() => {
      throw new BadRequestException('Email already exists');
    });

    await expect(service.create(payload)).rejects.toThrow(BadRequestException);
    expect(service.checkUniqueEmail).toHaveBeenCalledWith(payload.email);
    expect(prisma.user.create).not.toHaveBeenCalled();
    expect(eventEmitter.emit).not.toHaveBeenCalled();
  });
});
