import 'dotenv/config';
import postgres from '@prisma/orm-postgres/runtime';
import type { Contract } from './contract';
import contractJson from './contract.json' with { type: 'json' };
import { NODE_ENV } from '../../../prisma.config.js';

export const db = postgres<Contract>({
  contractJson,
  url: process.env[`${NODE_ENV}_DATABASE_URL`]!,
});
