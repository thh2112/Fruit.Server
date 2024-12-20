import { Global, Module } from '@nestjs/common';
import { CloudinaryModule } from 'src/integrations/cloudinary/cloudinary.module';
import { FileService } from './file.service';
import { RoleService } from './role.service';
import { UserService } from './user.service';
import { NewsService } from './news.service';

@Global()
@Module({
  imports: [CloudinaryModule],
  providers: [FileService, NewsService, RoleService, UserService],
  exports: [FileService, NewsService, RoleService, UserService],
})
export class RepositoriesModule {}
