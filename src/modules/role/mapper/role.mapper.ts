import { Role } from '../type/role.type.js';
import { localDateTimeFormatted } from '../../../shared/utils/app.util.js';

export class RoleMapper {
  static toDto = (role: Role) => {
    return {
      id: role.id,
      name: role.name,
      description: role.description,
      createdAt: localDateTimeFormatted(role.createdAt),
      updatedAt: localDateTimeFormatted(role.updatedAt),
    };
  };
}
