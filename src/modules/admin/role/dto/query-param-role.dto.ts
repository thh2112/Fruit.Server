import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseQueryParams } from 'src/_core/models';
import { FUNCTION_ERROR_CODE } from 'src/constants/consts';

export class QueryParamRoleDto implements BaseQueryParams {
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
}
