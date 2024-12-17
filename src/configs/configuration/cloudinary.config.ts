import { registerAs } from '@nestjs/config';
import { ConfigKeyEnum } from 'src/constants/enums';

export default registerAs(ConfigKeyEnum.Cloudinary, () => ({
  name: process.env.CLOUDINARY_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secret: process.env.CLOUDINARY_API_SECRET,
}));
