import { Global, Module } from '@nestjs/common';
import { FileService } from './file.service';
import { RoleService } from './role.service';
import { UserService } from './user.service';
import { NewsService } from './news.service';
import { CloudinaryModule } from 'src/modules/integrations/cloudinary/cloudinary.module';

@Global()
@Module({
  imports: [CloudinaryModule],
  providers: [FileService, NewsService, RoleService, UserService],
  exports: [FileService, NewsService, RoleService, UserService],
})
export class RepositoriesModule {}
