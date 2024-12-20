import { Controller, Get, Param } from '@nestjs/common';
import { Public } from 'src/_core/decorators';
import { IResponseSuccessPagination } from 'src/_core/interfaces';
import { ENDPOINT_PATH } from 'src/constants/consts';
import { NewsDto } from 'src/repositories/dtos/news/news.dto';
import { QueryParamNewsDto } from 'src/repositories/dtos/news/query-param-news.dto';
import { NewsService } from 'src/repositories/news.service';

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
