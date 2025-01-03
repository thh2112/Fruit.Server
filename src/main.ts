import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';

import { AuthInterceptor } from './_core/interceptors';
import { AppModule } from './app.module';
import { Environment, prefixApi } from './constants/consts';
import { AppConfig, ConfigKeyEnum } from './constants/enums/config.enum';
import { AllExceptionFilter, TransformResponseInterceptor } from './interceptors';
import { ValidationException } from './interceptors/exceptions/validation.exception';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: process.env.NODE_ENV === Environment.Production ? ['error', 'warn'] : ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const configService = app.get<ConfigService>(ConfigService);

  app.use(helmet());
  app.setGlobalPrefix(prefixApi);
  app.enableCors({
    origin: configService.get(ConfigKeyEnum.Cors).origin,
    credentials: configService.get(ConfigKeyEnum.Cors).credentials,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: '*',
  });

  app.useGlobalInterceptors(new AuthInterceptor());
  app.useGlobalInterceptors(new TransformResponseInterceptor());
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true,
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory(errors) {
        return new ValidationException(errors);
      },
      enableDebugMessages: process.env.NODE_ENV !== Environment.Production,
      transform: true,
      whitelist: true,
      validationError: {
        target: true,
        value: true,
      },
    }),
  );

  app.useGlobalFilters(new AllExceptionFilter(configService));

  if (process.env.NODE_ENV !== Environment.Production) {
    await app.listen(configService.get(AppConfig.PORT));
    console.log(`✅ Application is 🏃‍♂️ on: ${await app.getUrl()} - ${configService.get(AppConfig.NODE_ENV)}`);
  }
}
bootstrap();
