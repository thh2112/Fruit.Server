import { Module } from '@nestjs/common';
import { NewAdminController } from './new.admin.controller';
import { NewService } from 'src/repositories/new.service';
import { UserService } from 'src/repositories/user.service';
import { RoleService } from 'src/repositories/role.service';

@Module({
  controllers: [NewAdminController],
  providers: [NewService, UserService, RoleService],
})
export class NewAdminModule {}
