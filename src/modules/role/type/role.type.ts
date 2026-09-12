import { db } from '../../../database/prisma/db.js';

export type Role = Awaited<ReturnType<typeof db.orm.public.Role.create>>;
