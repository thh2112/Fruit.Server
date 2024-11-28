import { Module } from '@nestjs/common';

import { RoleAdminController } from './role.admin.controller';
import { RoleService } from 'src/providers/role/role.service';

@Module({
  controllers: [RoleAdminController],
  providers: [RoleService],
})
export class RoleAdminModule {}
