export enum FileType {
  PNG = 'image/png',
  JPEG = 'image/jpeg',
  JPG = 'image/jpg',
}

export enum FileSize {
  MAX_SIZE = 5000000,
}

export const ALLOW_FILE_REGEX = '^(image/png|image/jpeg|image/jpg)$';
