import type { CreateRoleDto } from '../dto/create-role.dto';
import type { CreateRole } from '../type/create-role.type';

export class RoleMapper {
  static toCreateRole(dto: CreateRoleDto): CreateRole {
    return {
      name: dto.name,
      description: dto.description,
    };
  }
}
