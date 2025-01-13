import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfile, UpdateUserDto } from './dto/update-user.dto';
import {
  CurrentUser,
  Public,
  resolveResponse,
  UseRoles,
} from '@monorepo/shared';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../../guards/role.guard';
import { User } from '@prisma/client';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor, File } from '@nest-lab/fastify-multer';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return resolveResponse(this.usersService.create(createUserDto));
  }

  @Get()
  @Public()
  findAll() {
    return resolveResponse(this.usersService.findAll());
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return resolveResponse(this.usersService.findOne(+id));
  }

  @Patch(':id')
  @Public()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return resolveResponse(this.usersService.update(+id, updateUserDto));
  }

  @Delete(':id')
  @Public()
  remove(@Param('id') id: string) {
    return resolveResponse(this.usersService.remove(+id));
  }

  @UseGuards(RolesGuard)
  @UseRoles('admin')
  @Get('admin')
  @ApiBearerAuth()
  getAdminData() {
    return { message: 'Admin access granted' };
  }

  @Put('update-profile')
  @ApiBearerAuth()
  updateProfile(
    @CurrentUser() user: User,
    @Body() updateUserDto: UpdateProfile,
  ) {
    return resolveResponse(
      this.usersService.updateProfile(user, updateUserDto),
    );
  }

  @Post('upload-avatar')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'file',
          nullable: false,
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }) as any,
    }),
  )
  upload(
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 4,
            message: 'File too large, maximum file size is 4MB',
          }),
        ],
      }),
    )
    file: File,
    @CurrentUser() user: User,
  ) {
    return resolveResponse(this.usersService.uploadProfilePicture(user, file));
  }
}
