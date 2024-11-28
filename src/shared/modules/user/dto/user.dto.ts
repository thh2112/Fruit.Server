import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Exclude, Expose, Transform } from 'class-transformer';
import { RoleDto } from '../../role/dto/role.dto';

export class UserDto extends OmitType(CreateUserDto, ['password', 'confirmPassword']) {
  @Expose()
  id: number;

  @Transform(({ obj }) => `${obj.firstName} ${obj.lastName}`)
  @Expose()
  fullName: string;

  @Expose()
  role: RoleDto;

  @Expose()
  isDeleted: boolean;

  @Expose()
  updatedAt: string;

  @Expose()
  createdAt: string;

  @Expose()
  deletedAt: string;

  @Exclude()
  password: string;

  @Exclude()
  confirmPassword: string;

  @Exclude()
  roleId: number;
}
