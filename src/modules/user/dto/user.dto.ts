import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Expose, Transform } from 'class-transformer';
import { RoleDto } from 'src/modules/admin/role/dto/role.dto';
export class UserDto extends OmitType(CreateUserDto, ['password', 'confirmPassword']) {
  @Transform(({ obj }) => `${obj.firstName} ${obj.lastName}`)
  fullName: string;

  @Expose()
  isDeleted: boolean;

  @Expose()
  updatedAt: string;

  @Expose()
  createdAt: string;

  @Expose()
  deletedAt: string;

  @Expose()
  role: RoleDto;
}
