import { registerAs } from '@nestjs/config';
import { Environment } from 'src/constants/consts';
import { ConfigKeyEnum } from 'src/constants/enums/config.enum';

export default registerAs(ConfigKeyEnum.Database, () => ({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  debug: process.env.DB_DEBUG === 'true',
  databaseUrl: process.env.DATABASE_URL,
  synchronize: process.env.NODE_ENV === Environment.Production,
}));
