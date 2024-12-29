import { Controller, Get, Param } from '@nestjs/common';
import { Public } from 'src/_core/decorators';
import { IResponseSuccessPagination } from 'src/_core/interfaces';
import { ENDPOINT_PATH } from 'src/constants/consts';
import { NewsDto, QueryParamNewsDto } from 'src/modules/features//news/dtos';
import { NewsService } from 'src/modules/features//news/services/news.service';

@Controller(ENDPOINT_PATH.PUBLIC.NEWS)
export class NewsPublicController {
  constructor(private readonly newsService: NewsService) {}

  @Public()
  @Get()
  async findMany(@Param() params: QueryParamNewsDto) {
    const { paging, result } = await this.newsService.findMany(params);
    const response: IResponseSuccessPagination<NewsDto[]> = {
      data: result,
      success: true,
      paging: paging,
    };
    return response;
  }
}
