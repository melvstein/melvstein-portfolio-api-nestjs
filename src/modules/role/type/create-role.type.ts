import { db } from '../../../database/prisma/db.js';

export type CreateRole = Parameters<typeof db.orm.public.Role.create>[0];
