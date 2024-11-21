import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { FUNCTION_ERROR_CODE } from 'src/constants/consts';
import { BaseCredentialDto } from 'src/modules/auth/dto/base-credential.dto';

export class CreateUserDto extends BaseCredentialDto {
  @IsNotEmpty()
  @MaxLength(50, { message: FUNCTION_ERROR_CODE.RGT.RGT_ERR_029 })
  firstName: string;

  @IsNotEmpty()
  @MaxLength(50, { message: FUNCTION_ERROR_CODE.RGT.RGT_ERR_030 })
  lastName: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  confirmPassword: string;

  @IsOptional()
  @IsString()
  avatar: string;
}
