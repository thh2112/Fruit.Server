import { Module } from '@nestjs/common';
import { NewsService } from 'src/repositories/news.service';
import { NewsAdminController } from './news.admin.controller';

@Module({
  controllers: [NewsAdminController],
  providers: [NewsService],
})
export class NewsAdminModule {}
