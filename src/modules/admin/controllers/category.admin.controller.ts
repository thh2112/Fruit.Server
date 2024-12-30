import { Body, Controller, Delete, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { IResponseSuccess } from 'src/_core/interfaces';
import { ENDPOINT_PATH } from 'src/constants/consts';
import { CaslAction } from 'src/constants/enums';
import { CheckPolicies } from 'src/modules/features//casl/decorators';
import { PoliciesGuard } from 'src/modules/features//casl/guards';
import { AppAbility } from 'src/modules/features//casl/types';
import { CategoryDto } from 'src/modules/features/product-management/category/dtos/category.dto';
import { CreateCategoryDto } from 'src/modules/features/product-management/category/dtos/create-category.dto';
import { CategoryService } from 'src/modules/features/product-management/category/services/category.service';

@Controller(ENDPOINT_PATH.ADMIN.CATEGORY)
export class CategoryAdminController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(CaslAction.Create, CategoryDto))
  @Post()
  async createCategory(@Body() dto: CreateCategoryDto) {
    const result = await this.categoryService.create(dto);
    const response: IResponseSuccess<CategoryDto> = {
      data: result,
      success: true,
    };
    return response;
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(CaslAction.Delete, CategoryDto))
  @Delete(':id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    await this.categoryService.deleteById(id);
    const response: IResponseSuccess<null> = {
      data: null,
      success: true,
    };
    return response;
  }
}
