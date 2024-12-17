import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IAuthPayload } from 'src/_core/interfaces';
import { appConfig } from 'src/configs/configuration';

@Injectable()
export class RefreshTokenJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(@Inject(appConfig.KEY) private readonly appConf: ConfigType<typeof appConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConf.authSecret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: Partial<IAuthPayload>) {
    return payload;
  }
}
