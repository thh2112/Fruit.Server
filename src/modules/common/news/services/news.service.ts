import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { BaseService, PaginatedResult } from 'src/_core/interfaces';
import { transformDtoToPlainObject } from 'src/shared/helpers/transform';
import { PrismaService } from 'src/shared/providers';

import { SYSTEM_ERROR_CODE } from 'src/constants/consts';

import { DateTimeUtil, PagingUtil } from 'src/shared/utils';
import _map from 'lodash/map';
import { Prisma } from '@prisma/client';
import { NewStatus } from 'src/constants/enums';
import { CreateNewsDto, NewsDto, QueryParamNewsDto, UpdateNewsDto } from '../dtos';
import { UserService } from 'src/modules/common/user/services/user.service';

@Injectable()
export class NewsService implements BaseService<NewsDto> {
  constructor(
    private readonly prismaService: PrismaService,
    private userService: UserService,
  ) {}

  private buildWhereCondition({ keyword, toDate, fromDate, status }: Partial<QueryParamNewsDto>): Prisma.NewWhereInput {
    const where: Prisma.NewWhereInput = {};

    if (keyword) {
      where.caption = { contains: keyword };
    }

    if (fromDate && toDate) {
      where.createdAt = { gte: fromDate, lte: toDate };
    }

    where.status = status ?? NewStatus.ACTIVE;

    return where;
  }

  private buildOrderByCondition(): Prisma.NewOrderByWithRelationInput[] {
    return [{ position: 'asc' }, { createdAt: 'desc' }];
  }

  async create(dto: CreateNewsDto): Promise<NewsDto> {
    try {
      const { caption, content, thumbnail, position, status, userId } = dto;

      const isExist = await this.userService.isExist(userId);
      if (!isExist) {
        throw new UnprocessableEntityException();
      }

      const newObj = await this.prismaService.new.create({
        data: {
          caption,
          content,
          thumbnail,
          position,
          status,
          author: {
            connect: {
              id: userId,
            },
          },
        },
        include: {
          author: true,
        },
      });

      return transformDtoToPlainObject(NewsDto, newObj);
    } catch (error) {
      throw error;
    }
  }
  async findMany(queryParams: QueryParamNewsDto): Promise<PaginatedResult<NewsDto[]>> {
    try {
      const { maxPerPage, pageNumber: page, keyword, toDate, fromDate, status } = queryParams;

      const where = this.buildWhereCondition({ keyword, toDate, fromDate, status });
      const orderBy = this.buildOrderByCondition();
      const { skip, take, pageNumber } = PagingUtil.getIns().generatePaging(page, maxPerPage);

      const [news, totalItem] = await Promise.all([
        this.prismaService.new.findMany({
          where: where,
          skip,
          take,
          orderBy: orderBy,
          include: {
            author: true,
          },
        }),
        this.prismaService.new.count({ where }),
      ]);

      const paging = PagingUtil.getIns().getPaging(pageNumber, maxPerPage, totalItem);
      const result = _map(news, newsItem => {
        return transformDtoToPlainObject(NewsDto, newsItem);
      });
      const pagingWithResult: PaginatedResult<NewsDto[]> = {
        result,
        paging,
      };
      return pagingWithResult;
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: number): Promise<NewsDto> {
    try {
      const foundNew = await this.prismaService.new.findUnique({
        where: { id },
        include: {
          author: true,
        },
      });

      if (!foundNew) {
        return null;
      }

      return transformDtoToPlainObject(NewsDto, foundNew);
    } catch (error) {
      throw error;
    }
  }
  async updateById(id: number, dto: UpdateNewsDto): Promise<NewsDto> {
    try {
      const { userId, ...restDto } = dto;
      const [foundNews, foundUser] = await Promise.all([this.isExist(id), this.userService.isExist(dto.userId)]);

      if (!foundNews) {
        throw new UnprocessableEntityException(SYSTEM_ERROR_CODE.NEWS.NEWS_ERR_001);
      }

      if (!foundUser) {
        throw new UnprocessableEntityException(SYSTEM_ERROR_CODE.USER.USER_ERR_003);
      }

      const updatedNews = await this.prismaService.new.update({
        where: { id },
        data: {
          ...restDto,
          updatedAt: DateTimeUtil.getIns().getISOString(),
          author: {
            connect: {
              id: dto.userId,
            },
          },
        },
      });

      return transformDtoToPlainObject(NewsDto, updatedNews);
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id: number): Promise<null> {
    try {
      const foundNews = this.findOneById(id);
      if (!foundNews) {
        throw new UnprocessableEntityException(SYSTEM_ERROR_CODE.NEWS.NEWS_ERR_001);
      }

      await this.prismaService.new.update({
        where: { id },
        data: {
          status: NewStatus.INACTIVE,
          deletedAt: DateTimeUtil.getIns().getISOString(),
        },
      });

      return null;
    } catch (error) {
      throw error;
    }
  }

  async isExist(id: number): Promise<boolean> {
    try {
      const news = await this.prismaService.new.findUnique({ where: { id } });
      return !!news;
    } catch (error) {
      throw error;
    }
  }
}
