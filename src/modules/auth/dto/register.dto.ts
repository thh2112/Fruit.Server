import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/repositories/dtos/user/create-user.dto';

export class RegisterDto extends OmitType(CreateUserDto, ['avatar'] as const) {}
