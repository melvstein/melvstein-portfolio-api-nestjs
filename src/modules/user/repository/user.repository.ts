import { Injectable } from '@nestjs/common';
import type { CreateUserDto } from '../dto/create-user.dto.js';
import { db } from '../../../database/prisma/db.js';

@Injectable()
export class UserRepository {
  async create(user: CreateUserDto) {
    return await db.orm.public.User.create(user);
  }

  async update(id: string, user: CreateUserDto) {
    return await db.orm.public.User.where({ id }).update(user);
  }

  async delete(id: string) {
    return await db.orm.public.User.where({ id }).delete();
  }

  async findAll() {
    return await db.orm.public.User.all();
  }

  async findById(id: string) {
    return await db.orm.public.User.where({ id }).first();
  }

  async findByUsername(username: string) {
    return await db.orm.public.User.where({ username }).first();
  }
}
