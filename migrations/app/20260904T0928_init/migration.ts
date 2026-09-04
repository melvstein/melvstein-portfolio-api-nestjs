#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/e5676943614b0ef6af871fa8674c69ceed7a66a447cfc4b69d15f197fd858b24/contract';
import endContract from '../../snapshots/e5676943614b0ef6af871fa8674c69ceed7a66a447cfc4b69d15f197fd858b24/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, lit, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createNativeEnumType({
        schema: 'public',
        typeName: 'auth_token_type',
        members: ['ACCESS', 'REFRESH', 'RESET_PASSWORD', 'VERIFY_EMAIL'],
      }),
      this.createNativeEnumType({
        schema: 'public',
        typeName: 'user_status',
        members: ['ACTIVE', 'INACTIVE', 'SUSPENDED'],
      }),
      this.createTable({
        schema: 'public',
        table: 'audit_logs',
        columns: [
          col('action', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('created_at', 'timestamp(3)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamp-temporal@1', typeParams: { precision: 3 } },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('ip_address', 'character varying(45)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 45 } },
          }),
          col('metadata', 'json', { codecRef: { codecId: 'pg/json@1' } }),
          col('resource', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('resource_id', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('user_agent', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('user_id', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['id'], { name: 'audit_logs_pkey' })],
      }),
      this.createTable({
        schema: 'public',
        table: 'auth_credentials',
        columns: [
          col('created_at', 'timestamp(3)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamp-temporal@1', typeParams: { precision: 3 } },
          }),
          col('email_verified_at', 'timestamp(3)', {
            codecRef: { codecId: 'pg/timestamp-temporal@1', typeParams: { precision: 3 } },
          }),
          col('failed_login_attempts', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('last_login_at', 'timestamp(3)', {
            codecRef: { codecId: 'pg/timestamp-temporal@1', typeParams: { precision: 3 } },
          }),
          col('locked_until', 'timestamp(3)', {
            codecRef: { codecId: 'pg/timestamp-temporal@1', typeParams: { precision: 3 } },
          }),
          col('password_changed_at', 'timestamp(3)', {
            codecRef: { codecId: 'pg/timestamp-temporal@1', typeParams: { precision: 3 } },
          }),
          col('password_hash', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamp(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamp-temporal@1', typeParams: { precision: 3 } },
          }),
          col('user_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['id'], { name: 'auth_credentials_pkey' })],
      }),
      this.createTable({
        schema: 'public',
        table: 'auth_tokens',
        columns: [
          col('created_at', 'timestamp(3)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamp-temporal@1', typeParams: { precision: 3 } },
          }),
          col('expires_at', 'timestamp(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamp-temporal@1', typeParams: { precision: 3 } },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('token', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('type', '"auth_token_type"', {
            notNull: true,
            codecRef: { codecId: 'pg/enum@1', typeParams: { typeName: 'auth_token_type' } },
          }),
          col('updated_at', 'timestamp(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamp-temporal@1', typeParams: { precision: 3 } },
          }),
          col('used_at', 'timestamp(3)', {
            codecRef: { codecId: 'pg/timestamp-temporal@1', typeParams: { precision: 3 } },
          }),
          col('user_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['id'], { name: 'auth_tokens_pkey' })],
      }),
      this.createTable({
        schema: 'public',
        table: 'permissions',
        columns: [
          col('action', 'character varying(50)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('created_at', 'timestamp(3)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamp-temporal@1', typeParams: { precision: 3 } },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('name', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('resource', 'character varying(50)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('updated_at', 'timestamp(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamp-temporal@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'], { name: 'permissions_pkey' })],
      }),
      this.createTable({
        schema: 'public',
        table: 'role_permissions',
        columns: [
          col('created_at', 'timestamp(3)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamp-temporal@1', typeParams: { precision: 3 } },
          }),
          col('created_by', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('permission_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('role_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('updated_at', 'timestamp(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamp-temporal@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['role_id', 'permission_id'], { name: 'role_permissions_pkey' })],
      }),
      this.createTable({
        schema: 'public',
        table: 'roles',
        columns: [
          col('created_at', 'timestamp(3)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamp-temporal@1', typeParams: { precision: 3 } },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('name', 'character varying(50)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('updated_at', 'timestamp(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamp-temporal@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'], { name: 'roles_pkey' })],
      }),
      this.createTable({
        schema: 'public',
        table: 'user_profiles',
        columns: [
          col('avatar_url', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('contact_number', 'character varying(30)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 30 } },
          }),
          col('created_at', 'timestamp(3)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamp-temporal@1', typeParams: { precision: 3 } },
          }),
          col('date_of_birth', 'date', { codecRef: { codecId: 'pg/date-temporal@1' } }),
          col('first_name', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('last_name', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('middle_name', 'character varying(100)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('updated_at', 'timestamp(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamp-temporal@1', typeParams: { precision: 3 } },
          }),
          col('user_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['id'], { name: 'user_profiles_pkey' })],
      }),
      this.createTable({
        schema: 'public',
        table: 'users',
        columns: [
          col('created_at', 'timestamp(3)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamp-temporal@1', typeParams: { precision: 3 } },
          }),
          col('email', 'character varying(255)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('role_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('status', '"user_status"', {
            notNull: true,
            default: lit('ACTIVE'),
            codecRef: { codecId: 'pg/enum@1', typeParams: { typeName: 'user_status' } },
          }),
          col('updated_at', 'timestamp(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamp-temporal@1', typeParams: { precision: 3 } },
          }),
          col('username', 'character varying(50)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
        ],
        constraints: [primaryKey(['id'], { name: 'users_pkey' })],
      }),
      this.addUnique({
        schema: 'public',
        table: 'auth_credentials',
        constraint: 'auth_credentials_user_id_key',
        columns: ['user_id'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'auth_tokens',
        constraint: 'auth_tokens_token_key',
        columns: ['token'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'permissions',
        constraint: 'permissions_name_key',
        columns: ['name'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'permissions',
        constraint: 'permissions_resource_action_key',
        columns: ['resource', 'action'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'roles',
        constraint: 'roles_name_key',
        columns: ['name'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'user_profiles',
        constraint: 'user_profiles_user_id_key',
        columns: ['user_id'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'users',
        constraint: 'users_email_key',
        columns: ['email'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'users',
        constraint: 'users_username_key',
        columns: ['username'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'audit_logs',
        index: 'audit_logs_action_idx',
        columns: ['action'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'audit_logs',
        index: 'audit_logs_created_at_idx',
        columns: ['created_at'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'audit_logs',
        index: 'audit_logs_resource_resource_id_idx',
        columns: ['resource', 'resource_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'audit_logs',
        index: 'audit_logs_user_id_idx',
        columns: ['user_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'auth_tokens',
        index: 'auth_tokens_expires_at_idx',
        columns: ['expires_at'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'auth_tokens',
        index: 'auth_tokens_type_idx',
        columns: ['type'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'auth_tokens',
        index: 'auth_tokens_user_id_idx',
        columns: ['user_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'role_permissions',
        index: 'role_permissions_permission_id_idx',
        columns: ['permission_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'users',
        index: 'users_created_at_idx',
        columns: ['created_at'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'users',
        index: 'users_role_id_idx_d9467c50',
        columns: ['role_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'users',
        index: 'users_status_idx',
        columns: ['status'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'audit_logs',
        foreignKey: {
          name: 'audit_logs_user_id_fkey',
          columns: ['user_id'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
          onDelete: 'setNull',
          onUpdate: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'auth_credentials',
        foreignKey: {
          name: 'auth_credentials_user_id_fkey',
          columns: ['user_id'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'auth_tokens',
        foreignKey: {
          name: 'auth_tokens_user_id_fkey',
          columns: ['user_id'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'role_permissions',
        foreignKey: {
          name: 'role_permissions_role_id_fkey',
          columns: ['role_id'],
          references: { schema: 'public', table: 'roles', columns: ['id'] },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'role_permissions',
        foreignKey: {
          name: 'role_permissions_permission_id_fkey',
          columns: ['permission_id'],
          references: { schema: 'public', table: 'permissions', columns: ['id'] },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'user_profiles',
        foreignKey: {
          name: 'user_profiles_user_id_fkey',
          columns: ['user_id'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'users',
        foreignKey: {
          name: 'users_role_id_fkey',
          columns: ['role_id'],
          references: { schema: 'public', table: 'roles', columns: ['id'] },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
