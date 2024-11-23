import { Expose } from 'class-transformer';

export class RoleDto {
  @Expose()
  id: number;

  @Expose()
  role: number;

  @Expose()
  createdAt: string;
}
