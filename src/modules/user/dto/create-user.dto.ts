import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { FUNCTION_ERROR_CODE } from 'src/constants/consts';
import { BaseCredentialDto } from 'src/modules/auth/dto/base-credential.dto';

export class CreateUserDto extends BaseCredentialDto {
  @IsNotEmpty({ message: FUNCTION_ERROR_CODE.RGT.RGT_ERR_001 })
  @MaxLength(50, { message: FUNCTION_ERROR_CODE.RGT.RGT_ERR_002 })
  firstName: string;

  @IsNotEmpty({ message: FUNCTION_ERROR_CODE.RGT.RGT_ERR_003 })
  @MaxLength(50, { message: FUNCTION_ERROR_CODE.RGT.RGT_ERR_004 })
  lastName: string;

  @IsNotEmpty({ message: FUNCTION_ERROR_CODE.RGT.RGT_ERR_005 })
  @MinLength(10, { message: FUNCTION_ERROR_CODE.RGT.RGT_ERR_006 })
  @MaxLength(16, { message: FUNCTION_ERROR_CODE.RGT.RGT_ERR_007 })
  phoneNumber: string;

  @IsNotEmpty({ message: FUNCTION_ERROR_CODE.RGT.RGT_ERR_008 })
  confirmPassword: string;

  @IsOptional()
  @IsString({ message: FUNCTION_ERROR_CODE.RGT.RGT_ERR_009 })
  avatar: string;

  @IsOptional()
  @IsNumber({}, { message: FUNCTION_ERROR_CODE.ROL.ROL_ERR_002 })
  roleId: number;
}
