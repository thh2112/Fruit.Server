import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import _values from "lodash/values";
import * as configurations from "../configs";
import { SharedModule } from "src/shared/shared.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: [".env", ".env.local", ".env.production"],
      load: _values(configurations),
    }),
    SharedModule,
  ],
  providers: [],
  exports: [ConfigModule, SharedModule],
})
export class CoreModule {}
