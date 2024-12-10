import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CloudinaryService } from 'src/integrations/cloudinary/cloudinary.service';
import { FileUtil } from 'src/shared/utils/file.util';
import { Sema } from 'async-sema';

@Injectable()
export class FileService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async uploadFile(files: Express.Multer.File[], folder: string = 'default') {
    try {
      const allowedUpload = FileUtil.getIns().allowFileTypes(files);
      if (!allowedUpload) {
        throw new InternalServerErrorException();
      }

      const semaphore = new Sema(5);
      const uploadPromises = files.map(async file => {
        await semaphore.acquire();
        try {
          const result = await this.cloudinaryService.uploadFile(file, folder);
          return result;
        } finally {
          semaphore.release();
        }
      });

      const result = await Promise.all(uploadPromises);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
