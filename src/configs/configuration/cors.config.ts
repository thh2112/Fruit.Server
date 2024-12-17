import { registerAs } from '@nestjs/config';
import { ConfigKeyEnum } from 'src/constants/enums';

export default registerAs(ConfigKeyEnum.Cors, () => ({
  origin: process.env.CORS_ORIGIN,
  credentials: process.env.CORS_CREDENTIALS === 'true',
}));
