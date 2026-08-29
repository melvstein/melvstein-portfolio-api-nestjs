import 'dotenv/config';
import { definePrismaConfig } from '@prisma/cli-engine';
import { defineConfig as ormConfig } from '@prisma/orm-postgres/config';

export const ENV = process.env['ENV']
  ? process.env['ENV'].toUpperCase()
  : 'DEVELOPMENT';

export default definePrismaConfig({
  orm: ormConfig({
    contract: './src/database/prisma/contract.prisma',
    db: {
      connection: process.env[`${ENV}_DIRECT_URL`]!,
    },
  }),
});
