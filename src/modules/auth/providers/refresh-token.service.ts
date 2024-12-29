import { UserDto } from 'src/modules/features/user/dtos';
import { IToken } from '../interfaces';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Inject, Injectable } from '@nestjs/common';
import { appConfig } from 'src/configs/configuration';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class RefreshTokenService implements IToken<UserDto> {
  private options: JwtSignOptions;
  private payloadToken: Partial<UserDto>;
  constructor(
    private readonly jwtService: JwtService,
    @Inject(appConfig.KEY) private readonly appConf: ConfigType<typeof appConfig>,
  ) {}

  setPayload(data: UserDto) {
    const { id, email, role, fullName, avatar } = data;
    const payload = {
      id,
      email,
      fullName,
      role,
      avatar,
    };

    this.payloadToken = payload;
    return this;
  }

  setOption(options?: JwtSignOptions) {
    const _options = {
      issuer: this.appConf.authIssuer,
      audience: this.appConf.authAudience,
      expiresIn: this.appConf.authTokenLife,
      secret: this.appConf.authRefreshTokenSecret,
      ...options,
    };

    this.options = _options;
    return this;
  }

  create(): string {
    return this.jwtService.sign(this.payloadToken, {
      ...this.options,
    });
  }
}
