import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  private static readonly fileSizeMax = 10000;
  transform(value: any, metadata: ArgumentMetadata) {
    return value.size < FileSizeValidationPipe.fileSizeMax;
  }
}
