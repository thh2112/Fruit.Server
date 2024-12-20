import { Module } from '@nestjs/common';
import { NewAdminController } from 'src/modules/admin/new/new.admin.controller';

@Module({
  controllers: [NewAdminController],
  //   providers: [NewService],
})
export class NewPublicModule {}
