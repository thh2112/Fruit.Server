import { Module } from '@nestjs/common';

import _values from 'lodash/values';
import { SharedModule } from 'src/shared/shared.module';
import { ConfigsModule } from 'src/configs/config.module';
import { I18nModule } from 'src/i18n/i18n.module';

@Module({
  imports: [SharedModule, ConfigsModule, I18nModule],
  providers: [],
  exports: [ConfigsModule, SharedModule, I18nModule],
})
export class CoreModule {}
