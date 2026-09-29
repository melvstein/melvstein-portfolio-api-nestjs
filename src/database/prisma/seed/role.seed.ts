import { Roles, runtime } from '../db.js';

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
    const existingRoleQuery = Roles.select('id')
      .where((f, fns) => fns.eq(f.roles.name, role.name))
      .build();

    const [existingRole] = await runtime.query(existingRoleQuery);

    if (existingRole) {
      console.log(`Role already exists: ${role.name}`, existingRole);
      continue;
    }
    const query = Roles.insert([role])
      .returning('id', 'name', 'description')
      .build();

    const result = await runtime.query(query);

    console.log(`Created role: ${role.name}`, result);
  }

  console.log('✅ Seeding completed');
}
