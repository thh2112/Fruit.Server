import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IAuthPayload } from 'src/_core/interfaces';
import { appConfig } from 'src/configs/configuration';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(appConfig.KEY) private readonly appConf: ConfigType<typeof appConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConf.authSecret,
    });
  }

  async validate(payload: Partial<IAuthPayload>) {
    if (!payload) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
