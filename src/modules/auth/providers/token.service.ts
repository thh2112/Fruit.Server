import { Injectable } from '@nestjs/common';
import { AccessTokenService } from './acccess-token.service';
import { RefreshTokenService } from './refresh-token.service';

@Injectable()
export class TokenService {
  constructor(
    public readonly accessTokenService: AccessTokenService,
    public readonly refreshTokenService: RefreshTokenService,
  ) {}
}
