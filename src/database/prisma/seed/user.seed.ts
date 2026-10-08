import { db } from '../db.js';
import * as bcrypt from 'bcrypt';
import { BcryptConstant } from '../../../common/constant/bcrypt.constant.js';

const superAdmin = {
  email: 'melvinbayogo@gmail.com',
  username: 'melvstein',
  password: 'a12345678',
  status: 'active',
};

export async function seedUsers() {
  // Ensure the password hashing is awaited
  console.log('🌱 Seeding users...');

  const superAdminRole = await db.orm.public.Role.where({
    name: 'superadmin',
  }).first();

  if (!superAdminRole) {
    console.log('Superadmin role not found');
    return;
  }

  const existingUser = await db.orm.public.User.where({
    username: superAdmin.username,
  }).first();

  if (existingUser) {
    console.log(`User already exists: ${superAdmin.username}`, existingUser);
    return;
  }

  const insertedUser = await db.orm.public.User.create({
    ...superAdmin,
    roleId: superAdminRole.id,
    password: await bcrypt.hash(
      superAdmin.password,
      BcryptConstant.SALT_ROUNDS,
    ),
  });

  const userDetails = await db.orm.public.User.where({
    id: insertedUser.id as string,
  })
    .include('role')
    .first();

  console.log(`Created user: ${superAdmin.username}`, userDetails);

  console.log('✅ Seeding completed');
}
