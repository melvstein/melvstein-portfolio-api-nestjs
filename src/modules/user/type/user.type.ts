import type { Models } from '../../../database/prisma/contract.js';
import type {
  Scalars,
  Shape,
} from '@prisma/orm-postgres/family-contract/types';

export type User = Scalars<Models.public_User>;

export type UserDetails = Shape<
  Models.public_User,
  {
    '-': 'password';
    role: { '+': 'id' | 'name' | 'description' | 'createdAt' | 'updatedAt' };
  }
>;
