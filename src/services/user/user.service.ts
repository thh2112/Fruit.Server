import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { BaseService } from 'src/_core/interfaces';
import { SYSTEM_ERROR_CODE } from 'src/constants/consts';
import { transformDtoToPlainObject } from 'src/shared/helpers/transform';
import { HashingService, PrismaService } from 'src/shared/providers';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { RoleEnum } from '@prisma/client';
import { RoleService } from '../role/role.service';
import { FileService } from '../file/file.service';

@Injectable()
export class UserService implements BaseService<UserDto> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly roleService: RoleService,
    private readonly hashingService: HashingService,
    private readonly fileService: FileService,
  ) {}
  async create(dto: CreateUserDto): Promise<UserDto | null> {
    try {
      const { email, password, confirmPassword, firstName, lastName, roleId, ...restDto } = dto;
      const foundUser = await this.findOneByEmail(email);
      if (foundUser) {
        throw new UnprocessableEntityException(SYSTEM_ERROR_CODE.USER.USER_ERR_001);
      }

      const foundRole = !roleId ? await this.roleService.findOneByRoleName(RoleEnum.USER) : await this.roleService.findOneById(roleId);
      if (!foundRole) {
        throw new UnprocessableEntityException(SYSTEM_ERROR_CODE.USER.USER_ERR_002);
      }

      const hashPassword = await this.hashingService.hash(password);
      const hashConfirmPassword = await this.hashingService.hash(confirmPassword);
      const user = await this.prismaService.user.create({
        data: {
          email,
          firstName,
          lastName,
          password: hashPassword,
          confirmPassword: hashConfirmPassword,
          ...restDto,
          role: {
            connect: {
              id: foundRole.id,
            },
          },
        },
      });

      return transformDtoToPlainObject(UserDto, user);
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: number): Promise<UserDto | null> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
        include: {
          role: true,
        },
      });

      if (!user) {
        return null;
      }

      return transformDtoToPlainObject(UserDto, user);
    } catch (error) {
      throw error;
    }
  }

  async findOneByEmail(email: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email,
        },
        include: {
          role: true,
        },
      });

      if (!user) {
        return null;
      }

      return transformDtoToPlainObject(UserDto, user);
    } catch (error) {
      throw error;
    }
  }

  async updateAvatar(userId: number, file: Express.Multer.File[]): Promise<UserDto> {
    try {
      const user = await this.findOneById(userId);
      if (!user) {
        throw new UnprocessableEntityException(SYSTEM_ERROR_CODE.USER.USER_ERR_001);
      }

      const files = await this.fileService.uploadFile(file, 'avatar');

      if (!files) {
        throw new UnprocessableEntityException(SYSTEM_ERROR_CODE.FILE.FILE_ERR_001);
      }

      const updatedUser = await this.prismaService.user.update({
        where: { id: userId },
        data: {
          avatar: files[0].secure_url,
        },
      });
      return transformDtoToPlainObject(UserDto, updatedUser);
    } catch (error) {
      throw error;
    }
  }
}
