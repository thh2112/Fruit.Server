import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { IResponseSuccess, IResponseSuccessPagination } from 'src/_core/interfaces';
import { CheckPolicies } from 'src/casl/decorators';
import { PoliciesGuard } from 'src/casl/guards';
import { ENDPOINT_PATH } from 'src/constants/consts';
import { CaslAction } from 'src/constants/enums';
import { CreateRoleDto } from 'src/shared/modules/role/dto/create-role.dto';
import { QueryParamRoleDto } from 'src/shared/modules/role/dto/query-param-role.dto';
import { RoleDto } from 'src/shared/modules/role/dto/role.dto';
import { RoleService } from 'src/shared/modules/role/role.service';

@Controller(ENDPOINT_PATH.ADMIN.ROLE)
export class RoleAdminController {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(PoliciesGuard)
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

  @UseGuards(PoliciesGuard)
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
