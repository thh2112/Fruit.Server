import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ENDPOINT_PATH } from 'src/constants/consts';
import { FileService } from 'src/services/file/file.service';

@Controller(ENDPOINT_PATH.FILE.BASE)
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @Post(ENDPOINT_PATH.FILE.UPLOAD)
  @UseInterceptors(FileInterceptor('files'))
  async uploadSingleFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 500000 }), new FileTypeValidator({ fileType: 'image/png' })],
      }),
    )
    files: Express.Multer.File[],
  ) {
    const result = await this.fileService.uploadFile(files);
    const response = {
      data: result,
      success: true,
    };
    return response;
  }
}
