import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [RoleModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
