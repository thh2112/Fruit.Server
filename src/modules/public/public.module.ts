import { Module } from '@nestjs/common';
import { NewsPublicModule } from './news/news.public.module';

@Module({
  imports: [NewsPublicModule],
})
export class PublicModule {}
