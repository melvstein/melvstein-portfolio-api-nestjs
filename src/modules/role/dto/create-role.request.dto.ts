import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleRequestDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsString()
  description?: string;
}
