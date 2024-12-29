import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { I18nMiddleware } from 'nestjs-i18n';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { PublicModule } from './modules/public/public.module';
import { CaslModule } from './modules/features/casl/casl.module';
import { ConfigsModule } from 'src/configs/config.module';
import { I18nModule } from 'src/i18n/i18n.module';
import { SharedModule } from './shared/shared.module';
import { FileModule } from './modules/features/file/file.module';

@Module({
  imports: [I18nModule, AuthModule, ConfigsModule, CaslModule, SharedModule, FileModule],
})
export class CoreModule {}

@Module({
  imports: [CoreModule, AdminModule, PublicModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(I18nMiddleware).forRoutes('*');
  }
}
