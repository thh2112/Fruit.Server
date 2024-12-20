import { Module } from '@nestjs/common';
import { NewsService } from 'src/repositories/news.service';
import { NewsPublicController } from './news.public.controller';

@Module({
  controllers: [NewsPublicController],
  providers: [NewsService],
})
export class NewsPublicModule {}
