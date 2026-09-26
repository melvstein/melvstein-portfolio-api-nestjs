import { Roles, Users, runtime } from '../db.js';
import * as bcrypt from 'bcrypt';
import { BcryptConstant } from '../../../common/constant/bcrypt.constant.js';

const superAdmin = {
  email: 'melvinbayogo@gmail.com',
  username: 'melvstein',
  password: 'a12345678',
};

export async function seedUsers() {
  // Ensure the password hashing is awaited
  console.log('🌱 Seeding users...');

  const roleQuery = Roles.select('id')
    .where((f, fns) => fns.eq(f.roles.name, 'SUPERADMIN'))
    .build();

  const [superAdminRole] = await runtime.query(roleQuery);

  const insertQuery = Users.insert([
    {
      ...superAdmin,
      role_id: superAdminRole.id,
      password: await bcrypt.hash(
        superAdmin.password,
        BcryptConstant.SALT_ROUNDS,
      ),
    },
  ])
    .returning('id')
    .build();

  const [insertedUser] = await runtime.query(insertQuery);

  const userQuery = Users.outerLeftJoin(Roles, (f, fns) =>
    fns.eq(f.users.role_id, f.roles.id),
  )
    .select((f) => ({
      id: f.users.id,
      email: f.users.email,
      username: f.users.username,
      password: f.users.password,
      status: f.users.status,
      roleId: f.users.role_id,
      roleName: f.roles.name,
      emailVerifiedAt: f.users.email_verified_at,
      lastLoginAt: f.users.last_login_at,
      passwordChangedAt: f.users.password_changed_at,
      failedLoginAttempts: f.users.failed_login_attempts,
      lockedUntil: f.users.locked_until,
      createdAt: f.users.created_at,
      updatedAt: f.users.updated_at,
    }))
    .where((f, fns) => fns.eq(f.users.id, insertedUser.id))
    .build();

  const [userDetails] = await runtime.query(userQuery);

  console.log(`Created user: ${superAdmin.username}`, userDetails);

  console.log('✅ Seeding completed');
}
