import { Role } from '../type/role.type';
import { AppUtil } from '../../../shared/utils/app.util.js';

export class RoleMapper {
  static toDto(role: Role): any {
    const dto = {
      id: role.id,
      name: role.name,
      description: role.description,
      createdAt: AppUtil.LocalDateTimeFormatted(
        new Date(String(role.created_at)),
      ),
      updatedAt: AppUtil.LocalDateTimeFormatted(
        new Date(String(role.updated_at)),
      ),
    };

    return dto;
  }
}
