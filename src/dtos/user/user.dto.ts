import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Exclude, Expose, Transform } from 'class-transformer';
import { RoleDto } from '../role/role.dto';

export class UserDto extends OmitType(CreateUserDto, ['password', 'confirmPassword']) {
  @Expose()
  id: number;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

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

  @Expose()
  gender: number;

  @Exclude()
  roleId: number;

  constructor(partial?: Partial<UserDto>) {
    super(partial);
    Object.assign(this, { ...this, ...partial });
  }
}
