import { Injectable, InternalServerErrorException, UnprocessableEntityException } from '@nestjs/common';
import _map from 'lodash/map';
import { BaseService, PaginatedResult } from 'src/_core/interfaces';
import { transformDtoToPlainObject } from 'src/shared/helpers/transform';
import { PrismaService } from 'src/shared/providers';
import { PagingUtil } from 'src/shared/utils';
import { CategoryDto } from '../dtos/category.dto';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { CategoryQueryParams } from '../dtos/category-query-params.dto';
import { Prisma } from '@prisma/client';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Injectable()
export class CategoryService implements BaseService<CategoryDto> {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateCategoryDto): Promise<CategoryDto> {
    try {
      const { name, parentId } = dto;

      const category = await this.prismaService.category.findUnique({
        where: {
          name,
        },
      });

      if (category) {
        throw new UnprocessableEntityException();
      }

      const newCategory = await this.prismaService.category.create({
        data: {
          name,
          parent: parentId
            ? {
                connect: {
                  id: parentId,
                },
              }
            : undefined,
        },
        select: this.getCategorySelectFields(),
      });
      return transformDtoToPlainObject(CategoryDto, newCategory);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async findOneById(id: number): Promise<CategoryDto> {
    try {
      const category = await this.prismaService.category.findUnique({
        where: { id: id },
        include: {
          children: true,
        },
      });

      if (!category) {
        return null;
      }

      return transformDtoToPlainObject(CategoryDto, category);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async findMany(queryParams: CategoryQueryParams): Promise<PaginatedResult<CategoryDto[]>> {
    try {
      const { maxPerPage, pageNumber: page } = queryParams;
      const { skip, take, pageNumber } = PagingUtil.getIns().generatePaging(page, maxPerPage);

      const where: Prisma.CategoryWhereInput = {
        parentId: null,
      };

      const [totalItem, categories] = await Promise.all([
        this.prismaService.category.count({ where }),
        this.prismaService.category.findMany({
          where,
          skip,
          take,
          select: this.getCategorySelectFields(),
          orderBy: {
            createdAt: 'desc',
          },
        }),
      ]);

      const paging = PagingUtil.getIns().getPaging(pageNumber, maxPerPage, totalItem);
      const result = _map(categories, category => transformDtoToPlainObject(CategoryDto, category));
      const pagingWithResult: PaginatedResult<CategoryDto[]> = {
        result,
        paging,
      };
      return pagingWithResult;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async deleteById(id: number): Promise<null> {
    try {
      await this.prismaService.category.delete({
        where: { id },
      });
      return null;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private getCategorySelectFields() {
    return {
      id: true,
      name: true,
      parentId: true,
      createdAt: true,
      children: {
        select: {
          id: true,
          name: true,
          parentId: true,
          createdAt: true,
        },
      },
    };
  }
}
