import { Body, Controller, FileTypeValidator, Get, Param, ParseFilePipe, ParseIntPipe, Patch, Post, Request, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request as ExpressRequest } from 'express';
import { Public } from 'src/_core/decorators';
import { IAuthPayload, IResponseSuccess } from 'src/_core/interfaces';
import { ENDPOINT_PATH } from 'src/constants/consts';
import { ALLOW_FILE_REGEX } from 'src/constants/enums';
import { UserDto } from 'src/services/user/dto/user.dto';
import { AuthService } from './auth.service';
import { Authenticated } from './decorators';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller(ENDPOINT_PATH.AUTH.BASE)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post(ENDPOINT_PATH.AUTH.LOGIN)
  async login(@Request() req: ExpressRequest) {
    const result = await this.authService.login(req.user as UserDto);
    return {
      data: result,
      success: true,
    };
  }

  @Post(ENDPOINT_PATH.AUTH.REGISTER)
  @Public()
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
  @Get(ENDPOINT_PATH.AUTH.PROFILE)
  async profile(@Authenticated() payload: IAuthPayload) {
    const result = await this.authService.profile(payload.id);
    const response: IResponseSuccess<UserDto> = {
      data: result,
      success: true,
    };
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  @Patch(`${ENDPOINT_PATH.AUTH.CHANGE_AVATAR}/:id`)
  async changeAvatar(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: ALLOW_FILE_REGEX })],
      }),
    )
    files: Express.Multer.File[],
  ) {
    const result = await this.authService.changeAvatar(id, files);
    const response: IResponseSuccess<UserDto> = {
      data: result,
      success: true,
    };
    return response;
  }
}
