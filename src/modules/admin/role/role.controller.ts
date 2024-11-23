import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { IResponseSuccess, IResponseSuccessPagination } from 'src/_core/interfaces';
import { ENDPOINT_PATH } from 'src/constants/consts';
import { CreateRoleDto } from './dto/create-role.dto';
import { QueryParamRoleDto } from './dto/query-param-role.dto';
import { RoleDto } from './dto/role.dto';
import { RoleService } from './role.service';

@Controller(ENDPOINT_PATH.ROLE.BASE)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    const result = await this.roleService.create(createRoleDto);
    const response: IResponseSuccess<RoleDto> = {
      data: result,
      success: true,
    };
    return response;
  }

  @Get()
  async findAll(@Query() queryParams: QueryParamRoleDto) {
    const { paging, result } = await this.roleService.findMany(queryParams);

    const response: IResponseSuccessPagination<RoleDto[]> = {
      data: result,
      success: true,
      paging,
    };
    return response;
  }
}
