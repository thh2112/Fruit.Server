import { IsEmail, IsNotEmpty, IsStrongPassword, Length, MaxLength } from 'class-validator';
import { FUNCTION_ERROR_CODE } from 'src/constants/consts';

export class BaseCredentialDto {
  @IsNotEmpty({ message: FUNCTION_ERROR_CODE.RGT.RGT_ERR_010 })
  @IsEmail({}, { message: FUNCTION_ERROR_CODE.RGT.RGT_ERR_011 })
  @MaxLength(50, { message: FUNCTION_ERROR_CODE.RGT.RGT_ERR_012 })
  email: string;

  @IsNotEmpty({ message: FUNCTION_ERROR_CODE.RGT.RGT_ERR_013 })
  @Length(8, 16, { message: FUNCTION_ERROR_CODE.RGT.RGT_ERR_014 })
  @IsStrongPassword({ minUppercase: 1, minSymbols: 1, minLength: 8, minNumbers: 1 }, { message: FUNCTION_ERROR_CODE.RGT.RGT_ERR_014 })
  password: string;
}
