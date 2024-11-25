import { Expose } from 'class-transformer';

export class RoleDto {
  @Expose()
  id: number;

  @Expose()
  role: string;

  @Expose()
  createdAt: string;
}
