import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/integrations/cloudinary/cloudinary.service';

@Injectable()
export class FileService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async uploadSingleFile(file: Express.Multer.File, folder: string = 'default') {
    try {
      const result = await this.cloudinaryService.uploadFile(file, folder);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
