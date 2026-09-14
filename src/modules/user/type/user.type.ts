import { db } from '../../../database/prisma/db.js';

export type User = Awaited<ReturnType<typeof db.orm.public.User.create>>;
