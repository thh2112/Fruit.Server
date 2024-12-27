import { FileType } from 'src/constants/enums';
import _size from 'lodash/size';
export class FileUtil {
  private static fileUtilIns = new FileUtil();

  static getIns() {
    if (!this.fileUtilIns) {
      this.fileUtilIns = new FileUtil();
    }
    return this.fileUtilIns;
  }

  allowFileTypes(files: Express.Multer.File[]): boolean {
    if (_size(files) <= 0) {
      return false;
    }

    const allowFileTypes = new Set<FileType>([FileType.JPEG, FileType.JPG, FileType.PNG, FileType.MP4, FileType.WEBP]);
    return files.every(fileType => allowFileTypes.has(fileType.mimetype as FileType));
  }
}
