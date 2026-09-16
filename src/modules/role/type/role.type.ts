import type {
  Scalars,
} from '@prisma/orm-postgres/family-contract/types';
import type { ResultType } from '@prisma/orm-postgres/components/runtime';
import { Models } from '../../../database/prisma/contract.d.js';
import { db } from '../../../database/prisma/db.js';

export type Role = Scalars<Models.public_Role>;