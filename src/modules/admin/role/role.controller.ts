import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { IResponseSuccess, IResponseSuccessPagination } from 'src/_core/interfaces';
import { ENDPOINT_PATH } from 'src/constants/consts';
import { CreateRoleDto } from './dto/create-role.dto';
import { QueryParamRoleDto } from './dto/query-param-role.dto';
import { RoleDto } from './dto/role.dto';
import { RoleService } from './role.service';
import { PoliciesGuard } from 'src/casl/guards';
import { CheckPolicies } from 'src/casl/decorators';
import { CaslAction } from 'src/constants/enums';
import { JwtAuthGuard } from 'src/modules/auth/guards';

@Controller(ENDPOINT_PATH.ROLE.BASE)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(ability => ability.can(CaslAction.Create, RoleDto))
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    const result = await this.roleService.create(createRoleDto);
    const response: IResponseSuccess<RoleDto> = {
      data: result,
      success: true,
    };
    return response;
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(ability => ability.can(CaslAction.Read, RoleDto))
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
