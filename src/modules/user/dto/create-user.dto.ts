import { UserStatus } from '../enum/user-status.enum.js';

export class CreateUserDto {
  roleId!: string;
  username!: string;
  email!: string;
  status!: UserStatus;
}
