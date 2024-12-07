import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ENDPOINT_PATH } from 'src/constants/consts';
import { CloudinaryService } from 'src/integrations/cloudinary/cloudinary.service';

@Controller(ENDPOINT_PATH.FILE.BASE)
export class FileController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  @Post(ENDPOINT_PATH.FILE.UPLOAD)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 500000 }), new FileTypeValidator({ fileType: 'image/png' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    const result = await this.cloudinaryService.uploadFile(file);
    const response = {
      data: result,
      success: true,
    };
    return response;
  }
}
