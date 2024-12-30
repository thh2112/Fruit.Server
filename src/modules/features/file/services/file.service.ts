import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FileUtil } from 'src/shared/utils/file.util';
import { Sema } from 'async-sema';
import { CloudinaryService } from 'src/modules/features/file/services/cloudinary.service';
import { FileOption, IFileService } from '../interfaces';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class FileService implements IFileService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async uploadFile(files: Express.Multer.File[], options: FileOption): Promise<UploadApiResponse[]> {
    try {
      const allowedUpload = FileUtil.getIns().allowFileTypes(files);
      if (!allowedUpload) {
        throw new InternalServerErrorException();
      }

      const semaphore = new Sema(5);
      const uploadPromises = files.map(async file => {
        await semaphore.acquire();
        try {
          const result = await this.cloudinaryService.uploadFile(file, options);
          return result;
        } finally {
          semaphore.release();
        }
      });

      const result = await Promise.all(uploadPromises);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  deleteFile(files: string[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
