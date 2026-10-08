import { User, UserDetails } from '../type/user.type.js';
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
      role_id: user.roleId,
      emailVerifiedAt: user.emailVerifiedAt
        ? localDateTimeFormatted(new Date(String(user.emailVerifiedAt)))
        : null,
      lastLoginAt: user.lastLoginAt
        ? localDateTimeFormatted(new Date(String(user.lastLoginAt)))
        : null,
      passwordChangedAt: user.passwordChangedAt
        ? localDateTimeFormatted(new Date(String(user.passwordChangedAt)))
        : null,
      failedLoginAttempts: user.failedLoginAttempts,
      lockedUntil: user.lockedUntil
        ? localDateTimeFormatted(new Date(String(user.lockedUntil)))
        : null,
      createdAt: localDateTimeFormatted(user.createdAt),
      updatedAt: localDateTimeFormatted(user.updatedAt),
    };
  };

  static toUserDetailsDto(userDetails: UserDetails) {
    return {
      id: userDetails.id,
      role: userDetails.role.name,
      email: userDetails.email,
      username: userDetails.username,
      status: userDetails.status as UserStatusEnum,
      emailVerifiedAt: userDetails.emailVerifiedAt
        ? localDateTimeFormatted(new Date(String(userDetails.emailVerifiedAt)))
        : null,
      lastLoginAt: userDetails.lastLoginAt
        ? localDateTimeFormatted(new Date(String(userDetails.lastLoginAt)))
        : null,
      passwordChangedAt: userDetails.passwordChangedAt
        ? localDateTimeFormatted(
            new Date(String(userDetails.passwordChangedAt)),
          )
        : null,
      failedLoginAttempts: userDetails.failedLoginAttempts,
      lockedUntil: userDetails.lockedUntil
        ? localDateTimeFormatted(new Date(String(userDetails.lockedUntil)))
        : null,
      createdAt: localDateTimeFormatted(userDetails.createdAt),
      updatedAt: localDateTimeFormatted(userDetails.updatedAt),
    };
  }
}
