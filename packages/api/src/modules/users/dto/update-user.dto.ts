import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';
import { Match } from '@monorepo/shared';

export class UpdateUserDto extends CreateUserDto {}

export class UpdateProfile {
  @IsNotEmpty()
  name: string;
}

export class ChangePasswordDto {
  @IsNotEmpty()
  oldPassword: string;

  @IsNotEmpty()
  newPassword: string;

  @IsNotEmpty()
  @Match('newPassword')
  confirmPassword: string;
}
