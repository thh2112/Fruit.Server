import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Express } from 'express';

@Injectable()
export class CloudinaryService {
  constructor(@Inject('CLOUDINARY') private readonly cloudinaryProvider: typeof cloudinary) {}

  async uploadFile(file: Express.Multer.File, folder: string = 'default'): Promise<UploadApiResponse> {
    try {
      const result: UploadApiResponse = await this.cloudinaryProvider.uploader.upload(file.path, { folder, resource_type: 'auto' });
      return result;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
