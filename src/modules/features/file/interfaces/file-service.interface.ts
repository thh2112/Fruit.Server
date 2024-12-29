import { UploadApiResponse } from 'cloudinary';

export interface FileOption {
  folder: string;
  height: number;
  width: number;
  format?: string;
}

export interface IFileService {
  uploadFile(files: Express.Multer.File[], options: FileOption): Promise<UploadApiResponse[]>;
  deleteFile(files: string[]): Promise<void>;
}
