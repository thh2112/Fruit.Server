import { Module } from '@nestjs/common';

import { RoleAdminController } from './role.admin.controller';

@Module({
  controllers: [RoleAdminController],
})
export class RoleAdminModule {}
