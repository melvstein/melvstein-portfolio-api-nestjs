import { Module } from '@nestjs/common';
import { RoleService } from './service/role.service.js';
import { RoleController } from './controller/role.controller.js';
import { RoleRepository } from './repository/role.repository.js';

@Module({
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
  exports: [RoleService, RoleRepository],
})
export class RoleModule {}
