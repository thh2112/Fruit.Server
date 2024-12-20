import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'src/constants/consts';
import { IBaseQueryParams } from '../interfaces';
import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { FUNCTION_ERROR_CODE } from 'src/constants/consts';

export class BaseQueryParams implements IBaseQueryParams {
  @IsOptional()
  @IsString({ message: FUNCTION_ERROR_CODE.QYP.QYP_ERR_001 })
  keyword: string;

  @Transform(({ obj }) => parseInt(obj?.maxPerPage))
  @IsNotEmpty({ message: FUNCTION_ERROR_CODE.QYP.QYP_ERR_002 })
  @IsNumber({}, { message: FUNCTION_ERROR_CODE.QYP.QYP_ERR_003 })
  maxPerPage: number;

  @Transform(({ obj }) => parseInt(obj?.pageNumber))
  @IsNotEmpty({ message: FUNCTION_ERROR_CODE.QYP.QYP_ERR_004 })
  @IsNumber({}, { message: FUNCTION_ERROR_CODE.QYP.QYP_ERR_005 })
  pageNumber: number;

  @IsOptional()
  @IsDateString({}, { message: FUNCTION_ERROR_CODE.QYP.QYP_ERR_006 })
  fromDate: string;

  @IsOptional()
  @IsDateString({}, { message: FUNCTION_ERROR_CODE.QYP.QYP_ERR_007 })
  toDate: string;

  constructor(obj?: IBaseQueryParams) {
    this.keyword = obj?.keyword || '';
    this.fromDate = obj?.fromDate;
    this.toDate = obj?.toDate;
    this.maxPerPage = obj?.maxPerPage || DEFAULT_PAGE_SIZE;
    this.pageNumber = obj?.pageNumber || DEFAULT_PAGE;
  }
}
