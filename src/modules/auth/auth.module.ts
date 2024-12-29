import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtConfigService, TokenService } from './providers';
import { JwtStrategy, RefreshTokenJwtStrategy } from './strategies';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from '../features/user/user.module';
import { AccessTokenService } from './providers/acccess-token.service';
import { RefreshTokenService } from './providers/refresh-token.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, AccessTokenService, RefreshTokenService, TokenService, RefreshTokenJwtStrategy],
})
export class AuthModule {}
