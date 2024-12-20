import { Module } from '@nestjs/common';

import _values from 'lodash/values';
import { SharedModule } from 'src/shared/shared.module';
import { ConfigsModule } from 'src/configs/config.module';
import { I18nModule } from 'src/i18n/i18n.module';
import { FileModule } from 'src/modules/file/file.module';
import { RepositoriesModule } from 'src/repositories/repositories.module';

@Module({
  imports: [SharedModule, ConfigsModule, I18nModule, FileModule, RepositoriesModule],
  providers: [],
  exports: [ConfigsModule, SharedModule, I18nModule, FileModule, RepositoriesModule],
})
export class CoreModule {}
