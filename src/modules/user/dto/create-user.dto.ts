import type { UserStatus } from '../enum/user-status.enum.js';

export class CreateUserDto {
  roleId!: string;
  email!: string;
  username!: string;
  password!: string;
  status?: UserStatus;
}
