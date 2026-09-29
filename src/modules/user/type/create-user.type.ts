import { UserStatusEnum } from '../enum/user-status.enum.js';

export type CreateUser = {
  role_id: string;
  email: string;
  username: string;
  password: string;
  status: UserStatusEnum;
};
