import { IsEnum, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import { FUNCTION_ERROR_CODE } from 'src/constants/consts';
import { NewStatus } from 'src/constants/enums';

export class CreateNewDto {
  @IsNotEmpty({ message: FUNCTION_ERROR_CODE.NEW.NEW_ERR_001 })
  @MaxLength(255, { message: FUNCTION_ERROR_CODE.NEW.NEW_ERR_004 })
  caption: string;

  @IsNotEmpty({ message: FUNCTION_ERROR_CODE.NEW.NEW_ERR_002 })
  content: string;

  @IsNotEmpty({ message: FUNCTION_ERROR_CODE.NEW.NEW_ERR_003 })
  thumbnail: string;

  @IsOptional()
  @IsEnum(NewStatus, { message: FUNCTION_ERROR_CODE.NEW.NEW_ERR_006, each: true })
  status: number;

  @IsNotEmpty({ message: FUNCTION_ERROR_CODE.NEW.NEW_ERR_007 })
  @IsNumber({ allowInfinity: false }, { message: FUNCTION_ERROR_CODE.NEW.NEW_ERR_008 })
  position: number;

  @IsNotEmpty({ message: FUNCTION_ERROR_CODE.NEW.NEW_ERR_009 })
  @IsNumber({ allowInfinity: false }, { message: FUNCTION_ERROR_CODE.NEW.NEW_ERR_010 })
  userId: number;
}
