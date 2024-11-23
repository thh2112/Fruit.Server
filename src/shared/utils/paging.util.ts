import { Injectable } from '@nestjs/common';
import { Pagination } from 'src/_core/interfaces';

@Injectable()
export class PagingUtil {
  private static pagingUtilIns: PagingUtil;
  public static getIns() {
    if (!this.pagingUtilIns) {
      this.pagingUtilIns = new PagingUtil();
    }
    return this.pagingUtilIns;
  }

  public generatePaging(pageNumber: number, maxPerPage: number) {
    if (!pageNumber || pageNumber < 1) {
      pageNumber = 1;
    }

    const skip = maxPerPage * (pageNumber - 1);
    const take = maxPerPage;
    return { skip, take, pageNumber };
  }

  public getPaging(page: number, pageSize: number, totalItem: number): Pagination {
    const totalPage = Math.ceil(totalItem / pageSize);
    return {
      maxPerPage: pageSize,
      pageNumber: page,
      totalItem,
      totalPage,
    };
  }
}
