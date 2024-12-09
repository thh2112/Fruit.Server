import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { appConfig } from 'src/configs/configuration';
import { FUNCTION_ERROR_CODE } from 'src/constants/consts';
import { transformDtoToPlainObject } from 'src/shared/helpers/transform';
import { HashingService, PrismaService } from 'src/shared/providers';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/services/user/user.service';
import { UserDto } from 'src/services/user/dto/user.dto';
import { CreateUserDto } from 'src/services/user/dto/create-user.dto';

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
      const { id, email, role, fullName } = user;
      const payload = {
        id,
        email,
        fullName,
        role,
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
        user,
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

  async changeAvatar(userId: number, file: Express.Multer.File) {
    return await this.userService.updateAvatar(userId, file);
  }

  private async generateToken(payload: any, options: any): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      ...options,
    });
  }
}
