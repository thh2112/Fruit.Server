import { Module } from '@nestjs/common';
import { NewsService } from './services/news.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}
