import { Global, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { IntegrationsModule } from 'src/integrations/integrations.module';
import { FileService } from 'src/services/file/file.service';
import { FileController } from './file.controller';
import moment from 'moment';
import * as fs from 'fs';

@Global()
@Module({
  imports: [
    IntegrationsModule,
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadsDir = path.join(__dirname, '..', '..', '..', 'uploads');
          if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
          }
          cb(null, uploadsDir);
        },
        filename: (req, file, cb) => {
          const filename = `${moment().valueOf()}_${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
