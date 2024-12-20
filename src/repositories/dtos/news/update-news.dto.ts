import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateNewsDto } from './create-news.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { FUNCTION_ERROR_CODE } from 'src/constants/consts';

export class UpdateNewsDto extends PartialType(OmitType(CreateNewsDto, ['userId'] as const)) {
  @IsNotEmpty({ message: FUNCTION_ERROR_CODE.NEWS.NEWS_ERR_009 })
  @IsNumber({ allowInfinity: false, allowNaN: false }, { message: FUNCTION_ERROR_CODE.NEWS.NEWS_ERR_010 })
  userId: number;
}
