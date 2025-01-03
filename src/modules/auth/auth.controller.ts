import {
  Body,
  Controller,
  ExecutionContext,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request as ExpressRequest } from 'express';
import { Public } from 'src/_core/decorators';
import { IAuthPayload, IResponseSuccess } from 'src/_core/interfaces';
import { ENDPOINT_PATH } from 'src/constants/consts';
import { ALLOW_FILE_REGEX, CaslAction } from 'src/constants/enums';
import { AuthService } from './auth.service';
import { AuthenticatedPayload, CurrentUser } from './decorators';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard, JwtRefreshAuthGuard } from './guards';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { DecryptChangePasswordPayload } from './interceptors';
import { PoliciesGuard } from '../features/casl/guards';
import { CheckPolicies } from '../features/casl/decorators';
import { AppAbility } from '../features/casl/types';
import { UpdateUserDto, UserDto } from '../features/user/dtos';

@UseGuards(JwtAuthGuard)
@Controller(ENDPOINT_PATH.AUTH.BASE)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post(ENDPOINT_PATH.AUTH.LOGIN)
  async login(@CurrentUser() user: UserDto) {
    const result = await this.authService.login(user);
    return {
      data: result,
      success: true,
    };
  }

  @Public()
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

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility, context: ExecutionContext) => {
    const { user } = context.switchToHttp().getRequest();
    const subject = new UserDto(user);
    return ability.can(CaslAction.Read, subject);
  })
  @Get(ENDPOINT_PATH.AUTH.PROFILE)
  async profile(@AuthenticatedPayload() payload: IAuthPayload) {
    const result = await this.authService.profile(payload.id);
    const response: IResponseSuccess<UserDto> = {
      data: result,
      success: true,
    };
    return response;
  }

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

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility, context: ExecutionContext) => {
    const id = Number(context.switchToHttp().getRequest().params.id);
    const subject = new UserDto({ id });
    return ability.can(CaslAction.Update, subject);
  })
  @Put(`${ENDPOINT_PATH.AUTH.PROFILE}/:id`)
  async updateProfile(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    const result = await this.authService.updateProfile(id, dto);
    const response: IResponseSuccess<UserDto> = {
      data: result,
      success: true,
    };
    return response;
  }

  @Post(ENDPOINT_PATH.AUTH.CHANGE_PASSWORD)
  @UseInterceptors(DecryptChangePasswordPayload)
  async changePassword(@AuthenticatedPayload() payload: IAuthPayload, @Body() dto: ChangePasswordDto) {
    const result = await this.authService.changePassword(payload, dto);
    const response: IResponseSuccess<null> = {
      data: result,
      success: true,
    };
    return response;
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post(ENDPOINT_PATH.AUTH.REFRESH_TOKEN)
  async refreshToken(@Request() req: ExpressRequest) {
    const result = await this.authService.refreshToken(req.user as UserDto);
    const response: IResponseSuccess<{ accessToken: string }> = {
      data: result,
      success: true,
    };
    return response;
  }
}
