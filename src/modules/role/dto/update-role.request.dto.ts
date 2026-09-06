import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleRequestDto } from './create-role.request.dto.js';

export class UpdateRoleRequestDto extends PartialType(CreateRoleRequestDto) {}
