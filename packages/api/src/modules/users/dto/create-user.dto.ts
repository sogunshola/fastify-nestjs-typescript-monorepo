import { IsEmail, IsNotEmpty } from '@monorepo/shared';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.trim().toLowerCase())
  email: string;

  @IsNotEmpty()
  password: string;

  // @IsOptional()
  // avatar?: string;
}
