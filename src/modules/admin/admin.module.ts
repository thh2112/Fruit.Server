import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ENDPOINT_PATH } from 'src/constants/consts';
import { BearerTokenMiddleware } from 'src/middlewares/bearer-token.middleware';
import { SharedModule } from 'src/shared/shared.module';
import { JwtAuthGuard } from '../auth/guards';
import { NewAdminModule } from './new/new.admin.module';
import { RoleAdminModule } from './role/role.admin.module';

@Module({
  imports: [RoleAdminModule, NewAdminModule, SharedModule],
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
