import { Global, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import path from 'path';
import { FileSize } from 'src/constants/enums';
import { DateTimeUtil } from 'src/shared/utils';

import { FileService } from './services/file.service';
import { CloudinaryProvider } from './services/cloudinary.provider';
import { CloudinaryService } from './services/cloudinary.service';

@Global()
@Module({
  imports: [
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
          const timestamp = DateTimeUtil.getIns().getDateTimeFormat();
          const sanitizedFileName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
          const filename = `${timestamp}_${sanitizedFileName}`;
          cb(null, filename);
        },
      }),
      limits: {
        fileSize: FileSize.MAX_SIZE,
      },
    }),
  ],
  providers: [FileService, CloudinaryProvider, CloudinaryService],
  exports: [FileService, MulterModule],
})
export class FileModule {}
