import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { IResponseSuccess, IResponseSuccessPagination } from 'src/_core/interfaces';
import { ENDPOINT_PATH } from 'src/constants/consts';
import { CaslAction } from 'src/constants/enums';
import { CheckPolicies } from 'src/modules/features//casl/decorators';
import { PoliciesGuard } from 'src/modules/features//casl/guards';
import { CreateRoleDto, QueryParamRoleDto, RoleDto } from 'src/modules/features//role/dtos';
import { RoleService } from 'src/modules/features//role/services/role.service';

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
