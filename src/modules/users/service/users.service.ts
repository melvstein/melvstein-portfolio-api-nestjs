import { Injectable } from '@nestjs/common';
import { db } from '../../../database/prisma/db.js';

@Injectable()
export class UsersService {

    async getUsers() {
        return await db.orm.public.User.all();
    }
}
