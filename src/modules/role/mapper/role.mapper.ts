import { Role } from '../type/role.type';
import { localDateTimeFormatted } from '../../../shared/utils/app.util.js';

export class RoleMapper {
  static toDto = (role: Role) => {
    return {
      id: role.id,
      name: role.name,
      description: role.description,
      createdAt: localDateTimeFormatted(new Date(String(role.created_at))),
      updatedAt: localDateTimeFormatted(new Date(String(role.updated_at))),
    };
  };
}
