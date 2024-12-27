import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ENDPOINT_PATH } from 'src/constants/consts';
import { BearerTokenMiddleware } from 'src/middlewares/bearer-token.middleware';
import { JwtAuthGuard } from '../auth/guards';
import { NewsAdminController } from './controllers/news.admin.controller';
import { RoleAdminController } from './controllers/role.admin.controller';
import { NewsModule } from '../common/news/news.module';
import { RoleModule } from '../common/role/role.module';

@Module({
  imports: [NewsModule, RoleModule],
  controllers: [NewsAdminController, RoleAdminController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BearerTokenMiddleware).forRoutes(`${ENDPOINT_PATH.ADMIN.BASE}/*`);
  }
}
