import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/shared/modules/user/dto/create-user.dto';

export class RegisterDto extends OmitType(CreateUserDto, ['avatar'] as const) {}
