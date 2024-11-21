import { Module } from '@nestjs/common';

import { CoreModule } from './_core/core.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [CoreModule, ConfigModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
