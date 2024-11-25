import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { BearerTokenMiddleware } from 'src/middlewares/bearer-token.middleware';
import { ENDPOINT_PATH } from 'src/constants/consts';
import { CaslModule } from 'src/casl/casl.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/guards';

@Module({
  imports: [RoleModule, CaslModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BearerTokenMiddleware)
      .exclude({
        path: `${ENDPOINT_PATH.AUTH.BASE}${ENDPOINT_PATH.AUTH.LOGIN}`,
        method: RequestMethod.ALL,
      })
      .exclude({
        path: `${ENDPOINT_PATH.AUTH.BASE}${ENDPOINT_PATH.AUTH.LOGOUT}`,
        method: RequestMethod.ALL,
      })
      .exclude({
        path: `${ENDPOINT_PATH.AUTH.BASE}${ENDPOINT_PATH.AUTH.REGISTER}`,
        method: RequestMethod.ALL,
      });
  }
}
