import { db } from 'src/database/prisma/db';

export type CreateUser = Parameters<typeof db.orm.public.User.create>[0];
