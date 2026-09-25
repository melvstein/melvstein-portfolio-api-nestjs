import { Roles, runtime } from '../db.js';

const roles = [
  {
    name: 'SUPERADMIN',
    description: 'Super Administrator with full access',
  },
  {
    name: 'ADMIN',
    description: 'Administrator with limited access',
  },
  {
    name: 'USER',
    description: 'Regular user with limited access',
  },
];

export async function seedRoles() {
  console.log('🌱 Seeding roles...');

  for (const role of roles) {
    const query = Roles.insert([role])
      .returning('id', 'name', 'description')
      .build();

    const result = await runtime.query(query);

    console.log(`Created role: ${role.name}`, result);
  }

  console.log('✅ Seeding completed');
}
