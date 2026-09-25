import type { UserStatusEnum } from '../enum/user-status.enum.js';

export interface UserDto {
  id: string;
  email: string;
  username: string;
  status: UserStatusEnum;
  role_id: string;
  emailVerifiedAt: string | null;
  lastLoginAt: string | null;
  passwordChangedAt: string | null;
  failedLoginAttempts: number;
  lockedUntil: string | null;
  createdAt: string;
  updatedAt: string;
}
