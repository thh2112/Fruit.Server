import { Module } from '@nestjs/common';
import { NewAdminService } from './new.admin.service';
import { NewsAdminController } from './news.admin.controller';

@Module({
  controllers: [NewsAdminController],
  providers: [NewAdminService],
})
export class NewsAdminModule {}
