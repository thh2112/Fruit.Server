import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request as ExpressRequest } from 'express';
import { Public } from 'src/_core/decorators';
import { IAuthPayload, IResponseSuccess } from 'src/_core/interfaces';
import { ENDPOINT_PATH } from 'src/constants/consts';
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
  @UseInterceptors(FileInterceptor('file'))
  @Patch(`${ENDPOINT_PATH.AUTH.CHANGE_AVATAR}/:id`)
  async changeAvatar(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 500000 }), new FileTypeValidator({ fileType: 'image/png' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    const result = await this.authService.changeAvatar(id, file);
    const response: IResponseSuccess<UserDto> = {
      data: result,
      success: true,
    };
    return response;
  }
}
