import { Inject, Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IAuthPayload } from 'src/_core/interfaces';
import { appConfig } from 'src/configs/configuration';
import { FUNCTION_ERROR_CODE, SYSTEM_ERROR_CODE } from 'src/constants/consts';
import { transformDtoToPlainObject } from 'src/shared/helpers/transform';
import { HashingService, PrismaService } from 'src/shared/providers';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RegisterDto } from './dto/register.dto';
import { CreateUserDto, UpdateUserDto, UserDto } from '../common/user/dtos';
import { UserService } from '../common/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(appConfig.KEY) private readonly appConf: ConfigType<typeof appConfig>,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDto | null> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },
        include: {
          role: true,
        },
      });

      if (!user) {
        throw new NotFoundException(FUNCTION_ERROR_CODE.LGI.LGI_ERR_002);
      }

      const isMatchPassword = await this.hashingService.compare(password, user.password);

      if (!isMatchPassword) {
        throw new UnauthorizedException(FUNCTION_ERROR_CODE.LGI.LGI_ERR_001);
      }

      return transformDtoToPlainObject(UserDto, user);
    } catch (error) {
      throw error;
    }
  }

  async register(dto: RegisterDto): Promise<UserDto> {
    try {
      const user = await this.userService.create(dto as CreateUserDto);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async login(user: UserDto) {
    try {
      const { id, email, role, fullName, avatar } = user;
      const payload = {
        id,
        email,
        fullName,
        role,
        avatar,
      };

      const accessTokenOptions = {
        issuer: this.appConf.authIssuer,
        audience: this.appConf.authAudience,
        expiresIn: this.appConf.authTokenLife,
      };

      const refreshTokenOptions = {
        ...accessTokenOptions,
        expiresIn: this.appConf.authRefreshTokenLife,
      };

      return {
        payload,
        accessToken: await this.generateToken(payload, accessTokenOptions),
        refreshToken: await this.generateToken(payload, refreshTokenOptions),
      };
    } catch (error) {
      throw error;
    }
  }

  async profile(userId: number): Promise<UserDto> {
    return await this.userService.findOneById(userId);
  }

  async changeAvatar(userId: number, files: Express.Multer.File[]) {
    return null;
    // return await this.userService.updateAvatar(userId, files);
  }

  async updateProfile(userId: number, updateDto: UpdateUserDto) {
    return await this.userService.updateById(userId, updateDto);
  }

  async refreshToken(user: UserDto): Promise<{ accessToken: string }> {
    try {
      const { id, email, role, fullName, avatar } = user;
      const payload = {
        id,
        email,
        fullName,
        role,
        avatar,
      };
      const token = await this.generateToken(payload, {
        issuer: this.appConf.authIssuer,
        audience: this.appConf.authAudience,
        expiresIn: this.appConf.authTokenLife,
      });
      return { accessToken: token };
    } catch (error) {
      throw error;
    }
  }

  async changePassword(user: IAuthPayload, dto: ChangePasswordDto) {
    try {
      const foundUser = await this.prismaService.user.findUnique({
        where: {
          id: user.id,
        },
      });

      if (!foundUser) {
        throw new UnprocessableEntityException(SYSTEM_ERROR_CODE.USER.USER_ERR_003);
      }

      const isMatchPassword = await this.hashingService.compare(dto.currentPassword, foundUser.password);

      if (!isMatchPassword) {
        throw new UnprocessableEntityException(SYSTEM_ERROR_CODE.USER.USER_ERR_004);
      }

      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          password: await this.hashingService.hash(dto.newPassword),
        },
      });

      return null;
    } catch (error) {
      throw error;
    }
  }

  private async generateToken(payload: any, options: any): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      ...options,
    });
  }
}
