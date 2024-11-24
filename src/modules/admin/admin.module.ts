import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { BearerTokenMiddleware } from 'src/middlewares/bearer-token.middleware';

@Module({
  imports: [RoleModule],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BearerTokenMiddleware).forRoutes('*');
  }
}
