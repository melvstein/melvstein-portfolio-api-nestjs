import { Injectable } from '@nestjs/common';
import { db } from '../../../database/prisma/db.js';

@Injectable()
export class UsersService {
  async getUsers() {
    try {
      return await db.orm.public.User.all();
    } catch (error) {
      console.error('Error fetching users:', error);
    }

    return null;
  }

  async getUserById(id: string) {
    const user = await db.orm.public.User.where({ id }).first();

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
