import { User } from '../type/user.type.js';
import type { UserDto } from '../dto/user.dto.js';
import type { UserStatusEnum } from '../enum/user-status.enum.js';
import { localDateTimeFormatted } from '../../../shared/utils/app.util.js';

export class UserMapper {
  static toDto = (user: User): UserDto => {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      status: user.status as UserStatusEnum,
      role_id: user.role_id,
      emailVerifiedAt: user.email_verified_at
        ? localDateTimeFormatted(new Date(String(user.email_verified_at)))
        : null,
      lastLoginAt: user.last_login_at
        ? localDateTimeFormatted(new Date(String(user.last_login_at)))
        : null,
      passwordChangedAt: user.password_changed_at
        ? localDateTimeFormatted(new Date(String(user.password_changed_at)))
        : null,
      failedLoginAttempts: user.failed_login_attempts,
      lockedUntil: user.locked_until
        ? localDateTimeFormatted(new Date(String(user.locked_until)))
        : null,
      createdAt: localDateTimeFormatted(new Date(String(user.created_at))),
      updatedAt: localDateTimeFormatted(new Date(String(user.updated_at))),
    };
  };
}
