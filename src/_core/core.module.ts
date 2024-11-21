import { Module } from '@nestjs/common';

import _values from 'lodash/values';
import { SharedModule } from 'src/shared/shared.module';
import { ConfigsModule } from 'src/configs/config.module';

@Module({
  imports: [SharedModule, ConfigsModule],
  providers: [],
  exports: [ConfigsModule, SharedModule],
})
export class CoreModule {}
