import { Global, Module } from '@nestjs/common';
import _values from 'lodash/values';
import { ConfigModule } from '@nestjs/config';
import * as configurations from './configuration';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ['.env', '.env.local', '.env.production'],
      load: _values(configurations),
    }),
  ],
})
export class ConfigsModule {}
