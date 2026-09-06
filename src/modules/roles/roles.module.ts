import { Module } from '@nestjs/common';
import { RolesService } from './service/roles.service.js';
import { RolesController } from './controller/roles.controller.js';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
