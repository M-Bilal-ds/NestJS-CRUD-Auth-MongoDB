import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class updateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password'] as const)
) {}