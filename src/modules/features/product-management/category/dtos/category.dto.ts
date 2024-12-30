import { Expose, Transform } from 'class-transformer';

export class CategoryDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  parentId: number;

  @Transform(({ obj }) => obj?.children)
  @Expose()
  children: CategoryDto[];
  @Expose()
  createdAt: string;
}
