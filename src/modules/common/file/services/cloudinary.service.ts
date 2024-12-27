import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Express } from 'express';
import { FileOption } from 'src/modules/common/file/interfaces';

@Injectable()
export class CloudinaryService {
  constructor(@Inject('CLOUDINARY') private readonly cloudinaryProvider: typeof cloudinary) {}

  async uploadFile(file: Express.Multer.File, options: FileOption): Promise<UploadApiResponse> {
    try {
      const result: UploadApiResponse = await this.cloudinaryProvider.uploader.upload(file.path, { ...options });
      return result;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
