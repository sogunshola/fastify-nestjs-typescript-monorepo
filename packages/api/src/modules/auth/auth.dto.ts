import { Match } from '@monorepo/shared';
import { Transform } from 'class-transformer';
import { IsEmail, IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim().toLowerCase())
  email: string;

  @IsNotEmpty()
  password: string;
}

export class RegisterDto {
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  firstName: string;

  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  lastName: string;

  @IsOptional()
  @Transform(({ value }) => value?.trim())
  businessName: string;

  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.trim().toLowerCase())
  email: string;

  @IsNotEmpty()
  @Transform(({ value }) => value.trim().replace(/\s/g, ''))
  phoneNumber: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  avatar: string;
}

export class VerifyOTPDto {
  @IsNotEmpty()
  @Transform(({ value }) => value.trim().toLowerCase())
  identifier: string;

  @IsNotEmpty()
  code: string;
}

export class GenerateOTPDto {
  @IsNotEmpty()
  @Transform(({ value }) => value.trim().toLowerCase())
  identifier: string;
}

export class ForgotPasswordDto {
  @IsNotEmpty()
  @Transform(({ value }) => value.trim().toLowerCase())
  identifier: string;
}

export class ResetPasswordDto {
  @IsNotEmpty()
  @Transform(({ value }) => value.trim().toLowerCase())
  email: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @Match('password')
  confirmPassword: string;
}

export class CheckIdentifierDto {
  @IsNotEmpty()
  @IsIn(['email', 'phone'])
  type: 'email' | 'phone';

  @IsNotEmpty()
  @Transform(({ value }) => value.trim().toLowerCase())
  identifier: string;

  @IsOptional()
  dialCode: string;

  @IsOptional()
  countryCode: string;

  @IsOptional()
  country: string;
}

export interface AuthPayload {
  id: number;
}
