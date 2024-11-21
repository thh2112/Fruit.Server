import { Module } from '@nestjs/common';

import { CoreModule } from './_core/core.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CoreModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
