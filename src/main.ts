import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { Environment, prefixApi } from './constants/consts';
import { AppConfig } from './constants/enums/config.enum';
import { AllExceptionFilter, ValidationException } from './interceptors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: process.env.NODE_ENV === Environment.Production ? ['error', 'warn'] : ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const configService = app.get<ConfigService>(ConfigService);

  app.use(helmet());
  app.setGlobalPrefix(prefixApi);
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
