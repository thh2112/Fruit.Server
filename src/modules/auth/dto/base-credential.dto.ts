import { IsEmail, IsNotEmpty, IsStrongPassword, Length, MaxLength } from 'class-validator';
import { FUNCTION_ERROR_CODE } from 'src/constants/consts';

export class BaseCredentialDto {
  @IsNotEmpty({ message: FUNCTION_ERROR_CODE.LGI.LGI_ERR_003 })
  @IsEmail({}, { message: FUNCTION_ERROR_CODE.LGI.LGI_ERR_001 })
  @MaxLength(50, { message: FUNCTION_ERROR_CODE.LGI.LGI_ERR_014 })
  email: string;

  @IsNotEmpty({ message: FUNCTION_ERROR_CODE.LGI.LGI_ERR_004 })
  @Length(8, 16, { message: FUNCTION_ERROR_CODE.LGI.LGI_ERR_015 })
  @IsStrongPassword({ minUppercase: 1, minSymbols: 1 })
  password: string;
}
