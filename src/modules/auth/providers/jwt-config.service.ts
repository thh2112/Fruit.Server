import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { appConfig } from 'src/configs/configuration';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(@Inject(appConfig.KEY) private readonly appConf: ConfigType<typeof appConfig>) {}

  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    return {
      secret: this.appConf.authSecret,
      signOptions: {
        expiresIn: this.appConf.authTokenLife,
        issuer: this.appConf.authIssuer,
        audience: this.appConf.authAudience,
      },
    };
  }
}
