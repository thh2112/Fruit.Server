import { Module } from '@nestjs/common';
import { NewsPublicController } from './controllers/news.public.controller';
import { NewsModule } from '../features/news/news.module';
import { CategoryModule } from '../features/product-management/category/category.module';
import { CategoryPublicController } from './controllers/category.public.controller';

@Module({
  imports: [NewsModule, CategoryModule],
  controllers: [NewsPublicController, CategoryPublicController],
})
export class PublicModule {}
