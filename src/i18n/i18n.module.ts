import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AcceptLanguageResolver, CookieResolver, HeaderResolver, I18nModule as I18nModuleImport, I18nValidationPipe, QueryResolver } from 'nestjs-i18n';
import { join } from 'path';
import { fallbackLanguage } from 'src/constants/consts';

@Module({
  imports: [
    I18nModuleImport.forRootAsync({
      useFactory: () => {
        return {
          fallbackLanguage: fallbackLanguage,
          loaderOptions: {
            path: join(__dirname, '../', 'i18n/'),
            watch: true,
          },
        };
      },
      resolvers: [new QueryResolver(['lang', 'l']), new HeaderResolver(['x-custom-lang']), new CookieResolver(), new AcceptLanguageResolver()],
    }),
  ],
})
export class I18nModule {}
