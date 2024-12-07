import { registerAs } from '@nestjs/config';
import { ConfigModuleEnum } from 'src/constants/enums';

export default registerAs(ConfigModuleEnum.Cloudinary, () => ({
  name: process.env.CLOUDINARY_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secret: process.env.CLOUDINARY_API_SECRET,
}));
