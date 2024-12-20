import { Global, Module } from '@nestjs/common';
import { CloudinaryModule } from 'src/integrations/cloudinary/cloudinary.module';
import { FileService } from './file.service';
import { NewService } from './new.service';
import { RoleService } from './role.service';
import { UserService } from './user.service';

@Global()
@Module({
  imports: [CloudinaryModule],
  providers: [FileService, NewService, RoleService, UserService],
  exports: [FileService, NewService, RoleService, UserService],
})
export class RepositoriesModule {}
