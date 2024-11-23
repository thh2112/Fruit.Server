import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { RoleModule } from '../admin/role/role.module';

@Module({
  imports: [RoleModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
