import { IsEnum, IsOptional } from 'class-validator';
import { BaseQueryParams } from 'src/_core/models';
import { FUNCTION_ERROR_CODE } from 'src/constants/consts';
import { NewStatus } from 'src/constants/enums';

export class QueryParamNewsDto extends BaseQueryParams {
  @IsOptional()
  @IsEnum(NewStatus, { message: FUNCTION_ERROR_CODE.NEWS.NEWS_ERR_006, each: true })
  status: number;

  constructor(obj?: QueryParamNewsDto) {
    super(obj);
    this.status = obj?.status;
  }
}
