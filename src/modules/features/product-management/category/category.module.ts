import { Module } from '@nestjs/common';
import { CategoryService } from './services/category.service';

@Module({
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
