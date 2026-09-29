import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { UserStatusEnum } from '../enum/user-status.enum.js';
import { RoleEnum } from '../../role/enum/role.enum.js';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Role is required' })
  @IsEnum(RoleEnum, { message: 'Role must be a valid role' })
  role!: RoleEnum;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be a string' })
  username!: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password!: string;

  @IsNotEmpty({ message: 'Status is required' })
  @IsEnum(UserStatusEnum, { message: 'Status must be a valid user status' })
  status!: UserStatusEnum;
}
