import { db } from '../../../database/prisma/db.js';
import type { ResultType } from '@prisma/orm-postgres/components/runtime';

export const roleQuery = db.sql.public.roles
  .select('id', 'name', 'description', 'created_at', 'updated_at')
  .build();

export type Role = ResultType<typeof roleQuery>;
