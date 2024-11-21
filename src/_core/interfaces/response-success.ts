import { IResponse } from './response.interface';

export type Pagination = {
  maxPerPage: number;
  pageNumber: number;
  totalItem: number;
  totalPage: number;
};

export interface IResponseSuccess<T> extends IResponse<T> {
  data: T;
  success: boolean;
}

export interface IResponseSuccessPagination<T> extends IResponse<T> {
  data: T;
  success: boolean;
  paging: Pagination;
}
