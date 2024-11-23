import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { RoleEnum } from '@prisma/client';
import _map from 'lodash/map';
import { BaseService, PaginatedResult } from 'src/_core/interfaces';
import { FUNCTION_ERROR_CODE } from 'src/constants/consts';
import { transformDtoToPlainObject } from 'src/shared/helpers/transform';
import { PrismaService } from 'src/shared/providers';
import { PagingUtil } from 'src/shared/utils';
import { CreateRoleDto } from './dto/create-role.dto';
import { QueryParamRoleDto } from './dto/query-param-role.dto';
import { RoleDto } from './dto/role.dto';

@Injectable()
export class RoleService implements BaseService<RoleDto> {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createRoleDto: CreateRoleDto): Promise<RoleDto | null> {
    try {
      const { role } = createRoleDto;
      const foundRole = await this.findOneByRoleName(role);
      if (foundRole) {
        throw new UnprocessableEntityException({ message: FUNCTION_ERROR_CODE.ROL.ROL_ERR_003 });
      }

      const createdRole = this.prismaService.role.create({
        data: {
          role,
        },
      });

      return transformDtoToPlainObject(RoleDto, createdRole);
    } catch (error) {
      throw error;
    }
  }

  async findOneByRoleName(role: RoleEnum): Promise<RoleDto> {
    try {
      const foundUser = this.prismaService.role.findUnique({
        where: { role },
      });

      if (!foundUser) {
        return null;
      }

      return transformDtoToPlainObject(RoleDto, foundUser);
    } catch (error) {
      throw error;
    }
  }

  async findMany(queryParams: QueryParamRoleDto): Promise<PaginatedResult<RoleDto[]>> {
    try {
      const { maxPerPage, pageNumber: page } = queryParams;
      const { skip, take, pageNumber } = PagingUtil.getIns().generatePaging(page, maxPerPage);

      const [roles, totalItem] = await Promise.all([
        this.prismaService.role.findMany({
          skip,
          take,
          orderBy: {
            createdAt: 'desc',
          },
        }),
        this.prismaService.role.count(),
      ]);

      const paging = PagingUtil.getIns().getPaging(pageNumber, page, totalItem);
      const result = _map(roles, role => transformDtoToPlainObject(RoleDto, role));
      const pagingWithResult: PaginatedResult<RoleDto[]> = {
        result,
        paging,
      };

      return pagingWithResult;
    } catch (error) {
      throw error;
    }
  }
}
