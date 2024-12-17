import { IsNotEmpty, IsStrongPassword, Length } from 'class-validator';
import { FUNCTION_ERROR_CODE } from 'src/constants/consts';

export class ChangePasswordDto {
  @IsNotEmpty({ message: FUNCTION_ERROR_CODE.RGT.RGT_ERR_017 })
  currentPassword: string;

  @IsNotEmpty({ message: FUNCTION_ERROR_CODE.RGT.RGT_ERR_018 })
  @Length(8, 16, { message: FUNCTION_ERROR_CODE.RGT.RGT_ERR_014 })
  @IsStrongPassword({ minUppercase: 1, minSymbols: 1, minLength: 8, minNumbers: 1 }, { message: FUNCTION_ERROR_CODE.RGT.RGT_ERR_014 })
  newPassword: string;
}
