import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(['INTERN', 'ADMIN', 'ENGINEER'])
  @IsOptional()
  role?: 'INTERN' | 'ADMIN' | 'ENGINEER';
}