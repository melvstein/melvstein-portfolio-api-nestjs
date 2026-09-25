import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RoleEnum } from '../enum/role.enum.js';

export class CreateRoleDto {
  @IsEnum(RoleEnum, { message: 'Name must be a valid role' })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name!: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;
}
