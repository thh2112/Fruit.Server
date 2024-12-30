import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { Public } from 'src/_core/decorators';
import { IResponseSuccess, IResponseSuccessPagination } from 'src/_core/interfaces';
import { ENDPOINT_PATH } from 'src/constants/consts';
import { CategoryQueryParams } from 'src/modules/features/product-management/category/dtos/category-query-params.dto';
import { CategoryDto } from 'src/modules/features/product-management/category/dtos/category.dto';
import { CategoryService } from 'src/modules/features/product-management/category/services/category.service';

@Controller(ENDPOINT_PATH.PUBLIC.CATEGORY)
export class CategoryPublicController {
  constructor(private readonly categoryService: CategoryService) {}

  @Public()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.categoryService.findOneById(id);
    const response: IResponseSuccess<CategoryDto> = {
      data: result,
      success: true,
    };
    return response;
  }

  @Public()
  @Get()
  async findAll(@Query() queryParams: CategoryQueryParams) {
    const { paging, result } = await this.categoryService.findMany(queryParams);
    const response: IResponseSuccessPagination<CategoryDto[]> = {
      data: result,
      success: true,
      paging,
    };
    return response;
  }
}
