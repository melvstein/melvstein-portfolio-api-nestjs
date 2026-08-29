import 'dotenv/config';
import postgres from '@prisma/orm-postgres/runtime';
import type { Contract } from './contract';
import contractJson from './contract.json' with { type: 'json' };
import { ENV } from '../../../prisma.config';

export const db = postgres<Contract>({
  contractJson,
  url: process.env[`${ENV}_DATABASE_URL`]!,
});
