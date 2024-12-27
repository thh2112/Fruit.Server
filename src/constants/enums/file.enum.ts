export enum FileType {
  PNG = 'image/png',
  JPEG = 'image/jpeg',
  JPG = 'image/jpg',
  MP4 = 'video/mp4',
  WEBP = 'video/webm',
}

export enum FileSize {
  MAX_SIZE = 10000000,
}

export const ALLOW_FILE_REGEX = '^(image/png|image/jpeg|image/jpg)$';
