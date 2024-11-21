import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

export class RegisterDto extends OmitType(CreateUserDto, ['firstName', 'lastName', 'password', 'confirmPassword', 'email', 'phoneNumber'] as const) {}
