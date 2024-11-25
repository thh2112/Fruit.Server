import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './_core/core.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { I18nMiddleware } from 'nestjs-i18n';
import { CaslModule } from './casl/casl.module';
import { ClientModule } from './modules/client/client.module';

@Module({
  imports: [CoreModule, ConfigModule, AuthModule, AdminModule, CaslModule, ClientModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(I18nMiddleware).forRoutes('*');
  }
}
