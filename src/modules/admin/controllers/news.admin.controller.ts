import { Body, Controller, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { IResponseSuccess } from 'src/_core/interfaces';
import { ENDPOINT_PATH } from 'src/constants/consts';
import { CaslAction } from 'src/constants/enums';
import { CheckPolicies } from 'src/modules/common//casl/decorators';
import { PoliciesGuard } from 'src/modules/common//casl/guards';
import { AppAbility } from 'src/modules/common//casl/types';
import { CreateNewsDto, NewsDto, UpdateNewsDto } from 'src/modules/common//news/dtos';
import { NewsService } from 'src/modules/common//news/services/news.service';

@Controller(ENDPOINT_PATH.ADMIN.NEWS)
export class NewsAdminController {
  constructor(private readonly newsService: NewsService) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(CaslAction.Create, NewsDto))
  @Post()
  async createNew(@Body() dto: CreateNewsDto) {
    const result = await this.newsService.create(dto);
    const response: IResponseSuccess<NewsDto> = {
      data: result,
      success: true,
    };
    return response;
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(CaslAction.Update, NewsDto))
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateNewsDto) {
    const result = await this.newsService.updateById(id, dto);
    const response: IResponseSuccess<NewsDto> = {
      data: result,
      success: true,
    };
    return response;
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(CaslAction.Delete, NewsDto))
  @Put(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.newsService.deleteById(id);
    const response: IResponseSuccess<null> = {
      data: null,
      success: true,
    };
    return response;
  }
}
