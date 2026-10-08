import { db } from '../db.js';

const roles = [
  {
    name: 'superadmin',
    description: 'Super Administrator with full access',
  },
  {
    name: 'admin',
    description: 'Administrator with limited access',
  },
  {
    name: 'user',
    description: 'Regular user with limited access',
  },
];

export async function seedRoles() {
  console.log('🌱 Seeding roles...');

  for (const role of roles) {
    const existingRole = await db.orm.public.Role.where({
      name: role.name,
    }).first();

    if (existingRole) {
      console.log(`Role already exists: ${role.name}`, existingRole);
      continue;
    }

    const result = await db.orm.public.Role.create(role);

    console.log(`Created role: ${role.name}`, result);
  }

  console.log('✅ Seeding completed');
}
