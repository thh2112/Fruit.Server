import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { BaseService } from 'src/_core/interfaces';
import { SYSTEM_ERROR_CODE } from 'src/constants/consts';
import { transformDtoToPlainObject } from 'src/shared/helpers/transform';
import { PrismaService } from 'src/shared/providers';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { RoleService } from '../admin/role/role.service';
import { RoleEnum } from '@prisma/client';

@Injectable()
export class UserService implements BaseService<UserDto> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly roleService: RoleService,
  ) {}
  async create(dto: CreateUserDto): Promise<UserDto | null> {
    try {
      const { email, password, confirmPassword, firstName, lastName, roleId, ...restDto } = dto;
      const foundUser = await this.findOneByEmail(email);
      if (foundUser) {
        throw new UnprocessableEntityException(SYSTEM_ERROR_CODE.USER.USER_ERR_001);
      }

      const foundRole = !roleId ? await this.roleService.findOneByRoleName(RoleEnum.USER) : this.roleService.findOneById(roleId);
      if (!foundRole) {
        throw new UnprocessableEntityException(SYSTEM_ERROR_CODE.USER.USER_ERR_002);
      }

      const user = await this.prismaService.user.create({
        data: {
          email,
          firstName,
          lastName,
          password,
          confirmPassword,
          role: {
            connect: {
              id: roleId,
            },
          },
          ...restDto,
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
      });

      if (!user) {
        return null;
      }

      return transformDtoToPlainObject(UserDto, user);
    } catch (error) {
      throw error;
    }
  }
}
