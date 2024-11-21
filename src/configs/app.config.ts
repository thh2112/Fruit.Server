import { registerAs } from "@nestjs/config";
import { Environment } from "src/constants/consts";
import { ConfigModuleEnum } from "src/constants/enums/config";

export default registerAs(ConfigModuleEnum.app, () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  nodeEnv: process.env.NODE_ENV || "development",
  appName: process.env.APP_NAME || "Fruit",
  isProduction: process.env.NODE_ENV === Environment.Production,
  isDevelopment: process.env.NODE_ENV === Environment.Development,
}));
