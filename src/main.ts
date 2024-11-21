import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { Environment } from "./constants/consts";
import { ConfigService } from "@nestjs/config";
import { AppConfig } from "./constants/enums/config";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: process.env.NODE_ENV === Environment.Production ? ["error", "warn"] : ["error", "warn", "log", "debug", "verbose"],
  });

  const configService = app.get<ConfigService>(ConfigService);

  if (process.env.NODE_ENV !== Environment.Production) {
    await app.listen(configService.get(AppConfig.PORT));
    console.log(`✅ Application is 🏃‍♂️ on: ${await app.getUrl()} - ${configService.get(AppConfig.NODE_ENV)}`);
  }
}
bootstrap();
