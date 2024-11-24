import { registerAs } from '@nestjs/config';
import { Environment } from 'src/constants/consts';
import { ConfigModuleEnum } from 'src/constants/enums/config.enum';

export default registerAs(ConfigModuleEnum.app, () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  nodeEnv: process.env.NODE_ENV || 'development',
  appName: process.env.APP_NAME || 'Fruit',
  authSecret: process.env.AUTH_SECRET,
  authTokenLife: process.env.AUTH_TOKEN_LIFE,
  authIssuer: process.env.AUTH_ISSUER,
  authAudience: process.env.AUTH_AUDIENCE,
  authRefreshTokenLife: process.env.AUTH_REFRESH_TOKEN_LIFE,
  isProduction: process.env.NODE_ENV === Environment.Production,
  isDevelopment: process.env.NODE_ENV === Environment.Development,
}));
