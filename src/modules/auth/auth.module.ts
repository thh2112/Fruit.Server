import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { RoleService } from 'src/services/role/role.service';
import { UserService } from 'src/services/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtConfigService } from './providers';
import { JwtStrategy, RefreshTokenJwtStrategy } from './strategies';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshTokenJwtStrategy, UserService, RoleService],
})
export class AuthModule {}
