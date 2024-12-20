import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { IResponseSuccess } from 'src/_core/interfaces';
import { CheckPolicies } from 'src/casl/decorators';
import { PoliciesGuard } from 'src/casl/guards';
import { AppAbility } from 'src/casl/types';
import { ENDPOINT_PATH } from 'src/constants/consts';
import { CaslAction } from 'src/constants/enums';
import { CreateNewDto } from 'src/repositories/dtos/new/create-new.dto';
import { NewDto } from 'src/repositories/dtos/new/new.dto';
import { NewService } from 'src/repositories/new.service';

@Controller(ENDPOINT_PATH.ADMIN.NEW)
export class NewAdminController {
  constructor(private readonly newService: NewService) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(CaslAction.Create, NewDto))
  @Post()
  async createNew(@Body() dto: CreateNewDto) {
    const result = await this.newService.create(dto);
    const response: IResponseSuccess<NewDto> = {
      data: result,
      success: true,
    };
    return response;
  }
}
