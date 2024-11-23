import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'src/constants/consts';
import { IBaseQueryParams } from '../interfaces';

export abstract class BaseQueryParams implements IBaseQueryParams {
  keyword: string;
  maxPerPage: number;
  pageNumber: number;

  constructor(obj: IBaseQueryParams) {
    this.keyword = obj?.keyword || '';
    this.maxPerPage = obj?.maxPerPage || DEFAULT_PAGE_SIZE;
    this.pageNumber = obj?.pageNumber || DEFAULT_PAGE;
  }
}
