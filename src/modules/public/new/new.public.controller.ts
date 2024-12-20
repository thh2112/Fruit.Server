import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Public } from 'src/_core/decorators';
import { IResponseSuccess, IResponseSuccessPagination } from 'src/_core/interfaces';
import { CheckPolicies } from 'src/casl/decorators';
import { PoliciesGuard } from 'src/casl/guards';
import { ENDPOINT_PATH } from 'src/constants/consts';
import { CaslAction } from 'src/constants/enums';
import { NewDto } from 'src/repositories/dtos/new/new.dto';
import { CreateRoleDto } from 'src/repositories/dtos/role/create-role.dto';
import { NewService } from 'src/repositories/new.service';

@Controller(ENDPOINT_PATH.PUBLIC.NEW)
export class NewPublicController {
  constructor(private readonly newService: NewService) {}

  @Public()
  @Get()
  async findMany(@Body() createRoleDto: CreateRoleDto) {
    // const result = await this.roleService.create(createRoleDto);
    const response: IResponseSuccessPagination<NewDto[]> = {
      data: [],
      success: true,
      paging: null,
    };
    return response;
  }
}
