import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfile, UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import {
  Helper,
  CloudStorage,
  env,
  Cloudinary,
  AppEventConstants,
} from '@monorepo/shared';
import { User } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async checkUniqueEmail(email: string) {
    // check if the email already exists
    const user = await this.findByEmail(email);
    if (user) {
      throw new BadRequestException('Email already exists');
    }
  }

  /**
   * Creates a new user with the provided payload.
   *
   * This method performs the following actions:
   * 1. Checks if the email in the payload is unique.
   * 2. Hashes the user's password before saving it to the database.
   * 3. Creates a new user record in the database with the hashed password.
   * 4. Emits a user created event.
   *
   * @param {CreateUserDto} payload - The data transfer object containing user details.
   * @returns {Promise<User>} The created user object.
   * @throws {Error} If the email is not unique or if there is an issue with user creation.
   */
  async create(payload: CreateUserDto) {
    await this.checkUniqueEmail(payload.email);
    // hash the password before saving it to the database
    const hashedPassword = await Helper.hash(payload.password);
    const user = await this.prisma.user.create({
      data: {
        ...payload,
        password: hashedPassword,
      },
    });

    // emit the user created event
    this.eventEmitter.emit(AppEventConstants.USER_CREATED, user);
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async updateProfile(user: User, payload: UpdateProfile) {
    const { id } = user;
    const { name } = payload;
    const response = await this.prisma.user.update({
      where: { id },
      data: { name },
    });

    return response;
  }

  /**
   * Uploads a profile picture for a user.
   *
   * @param user - The user object containing user details.
   * @param payload - The payload containing the file path of the profile picture.
   * @returns The updated user object with the new avatar URL.
   *
   * @throws Will throw an error if the file upload or database update fails.
   */
  async uploadProfilePicture(user: User, payload: any) {
    const storage = new CloudStorage(
      new Cloudinary({
        cloudName: env.cloudinary.cloudName,
        apiKey: env.cloudinary.apiKey,
        apiSecret: env.cloudinary.apiSecret,
      }),
    );
    const { id } = user;
    const fileUrl = await storage.uploadFile(payload.path, undefined, {
      folder: 'profile',
    });
    const response = await this.prisma.user.update({
      where: { id },
      data: { avatar: fileUrl },
    });

    return response;
  }
}
