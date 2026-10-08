import type { Models } from '../../../database/prisma/contract.js';
import type { Scalars } from '@prisma/orm-postgres/family-contract/types';

export type Role = Scalars<Models.public_Role>;
