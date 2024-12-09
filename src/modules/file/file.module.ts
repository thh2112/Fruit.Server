import { Global, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { FileService } from 'src/services/file/file.service';
import { FileController } from './file.controller';
import moment from 'moment';
import * as fs from 'fs';
import { CloudinaryModule } from 'src/integrations/cloudinary/cloudinary.module';

@Global()
@Module({
  imports: [
    CloudinaryModule,
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadsDir = path.resolve(__dirname, '..', '..', '..', 'uploads');
          if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
          }
          cb(null, uploadsDir);
        },
        filename: (req, file, cb) => {
          const timestamp = moment().format('YYYYMMDD_HHmmss');
          const sanitizedFileName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
          const filename = `${timestamp}_${sanitizedFileName}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService, MulterModule],
})
export class FileModule {}
