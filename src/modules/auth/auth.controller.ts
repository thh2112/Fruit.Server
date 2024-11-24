import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { IResponseSuccess } from 'src/_core/interfaces';
import { ENDPOINT_PATH } from 'src/constants/consts';
import { UserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards';

@Controller(ENDPOINT_PATH.AUTH.BASE)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post(ENDPOINT_PATH.AUTH.LOGIN)
  async login(@Request() req: ExpressRequest) {
    const result = await this.authService.login(req.user as UserDto);
    return {
      data: result,
      success: true,
    };
  }

  @Post(ENDPOINT_PATH.AUTH.REGISTER)
  async register(@Body() registerDto: RegisterDto): Promise<IResponseSuccess<UserDto>> {
    const result: UserDto = await this.authService.register(registerDto);
    const response: IResponseSuccess<UserDto> = {
      data: result,
      success: true,
    };
    return response;
  }

  @UseGuards(LocalAuthGuard)
  @Post(ENDPOINT_PATH.AUTH.LOGOUT)
  async logout(@Request() req) {
    return req.logout();
  }

  @UseGuards(JwtAuthGuard)
  @Post(ENDPOINT_PATH.AUTH.PROFILE)
  async profile() {
    const result = await this.authService.profile(1);
    const response: IResponseSuccess<UserDto> = {
      data: result,
      success: true,
    };
    return response;
  }
}
