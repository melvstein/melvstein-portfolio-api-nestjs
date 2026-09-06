import { TimestamptzString } from '@prisma/orm-postgres/target/codec-types';

export interface Role {
  id: string;
  name: string;
  description?: string | null;
  createdAt: TimestamptzString<3>;
  updatedAt: TimestamptzString<3>;
}
