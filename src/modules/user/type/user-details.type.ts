import type { RoleEnum } from '../../role/enum/role.enum.js';

export type UserDetails = {
  id: string;
  email: string;
  username: string;
  password: string;
  status: string;
  roleId: string;
  role: RoleEnum;
  emailVerifiedAt: string | null;
  lastLoginAt: string | null;
  passwordChangedAt: string | null;
  failedLoginAttempts: number;
  lockedUntil: string | null;
  createdAt: string;
  updatedAt: string;
};
