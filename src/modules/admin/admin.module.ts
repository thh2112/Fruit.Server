import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ENDPOINT_PATH } from 'src/constants/consts';
import { BearerTokenMiddleware } from 'src/middlewares/bearer-token.middleware';
import { JwtAuthGuard } from '../auth/guards';
import { NewsAdminController } from './controllers/news.admin.controller';
import { RoleAdminController } from './controllers/role.admin.controller';
import { NewsModule } from '../features/news/news.module';
import { RoleModule } from '../features/role/role.module';
import { CategoryAdminController } from './controllers/category.admin.controller';
import { CategoryModule } from '../features/product-management/category/category.module';

@Module({
  imports: [NewsModule, RoleModule, CategoryModule],
  controllers: [NewsAdminController, RoleAdminController, CategoryAdminController],
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
