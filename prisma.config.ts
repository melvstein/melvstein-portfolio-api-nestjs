import 'dotenv/config';
import { definePrismaConfig } from '@prisma/cli-engine';
import { defineConfig as ormConfig } from '@prisma/orm-postgres/config';

export const NODE_ENV = process.env['NODE_ENV']
  ? process.env['NODE_ENV'].toUpperCase()
  : 'DEVELOPMENT';

export default definePrismaConfig({
  orm: ormConfig({
    contract: './src/database/prisma/contract.prisma',
    db: {
      connection: process.env[`${NODE_ENV}_DIRECT_URL`]!,
    },
  }),
});
