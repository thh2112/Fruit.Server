import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto/user.dto';
import { RegisterDto } from './dto/register.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { HashingService, PrismaService } from 'src/shared/providers';
import { transformDtoToPlainObject } from 'src/shared/helpers/transform';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
    private readonly hashingService: HashingService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDto | null> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new NotFoundException('Please check your credential information');
      }

      const isMatchPassword = await this.hashingService.compare(password, user.password);

      if (!isMatchPassword) {
        throw new UnauthorizedException('Please check your credential information');
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
    console.log('user', user);
  }
}
