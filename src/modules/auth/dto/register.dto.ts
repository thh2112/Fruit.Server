import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/common/user/dtos';

export class RegisterDto extends OmitType(CreateUserDto, ['avatar'] as const) {}
