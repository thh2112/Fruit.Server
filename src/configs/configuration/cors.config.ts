import { registerAs } from '@nestjs/config';
import { ConfigModuleEnum } from 'src/constants/enums';

export default registerAs(ConfigModuleEnum.Cors, () => ({
  origin: process.env.CORS_ORIGIN,
  credentials: process.env.CORS_CREDENTIALS === 'true',
}));
