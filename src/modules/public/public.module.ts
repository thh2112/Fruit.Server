import { Module } from '@nestjs/common';
import { NewsPublicController } from './controllers/news.public.controller';
import { NewsModule } from '../features/news/news.module';

@Module({
  imports: [NewsModule],
  controllers: [NewsPublicController],
})
export class PublicModule {}
