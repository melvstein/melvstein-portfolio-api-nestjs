import { seedRoles } from './role.seed.js';
import { seedUsers } from './user.seed.js';

async function seed() {
  await seedRoles();
  await seedUsers();
}

seed()
  .then(() => {
    console.log('🌱 Database seeding completed');
    process.exit(0);
  })
  .catch((error: unknown) => {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  });
