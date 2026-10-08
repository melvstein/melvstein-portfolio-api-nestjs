import { UserStatusEnum } from '../enum/user-status.enum.js';

export type CreateUser = {
  roleId: string;
  email: string;
  username: string;
  password: string;
  status: UserStatusEnum;
};
