import { registerAs } from '@nestjs/config';
import { ConfigKeyEnum } from 'src/constants/enums';

export default registerAs(ConfigKeyEnum.Crypto, () => ({
  cryptoSecretKey: process.env.CRYPTO_SECRET_KEY,
  cryptoKeySize: process.env.CRYPTO_KEY_SIZE,
}));
