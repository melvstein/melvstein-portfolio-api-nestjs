import type { ResultType } from '@prisma/orm-postgres/components/runtime';
import { Users } from 'src/database/prisma/db';

export const userQuery = Users.select(
  'id',
  'username',
  'password',
  'email',
  'status',
  'role_id',
  'email_verified_at',
  'last_login_at',
  'password_changed_at',
  'failed_login_attempts',
  'locked_until',
  'created_at',
  'updated_at',
).build();

export type User = ResultType<typeof userQuery>;
