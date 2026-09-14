import { db } from '../../../database/prisma/db.js';

export type UpdateRole = Parameters<typeof db.orm.public.Role.update>[0];
