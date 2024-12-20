import { Expose, Transform, Type } from 'class-transformer';
import { UserDto } from '../user/user.dto';

export class NewDto {
  @Expose()
  id: number;

  @Expose()
  caption: string;

  @Expose()
  content: string;

  @Expose()
  thumbnail: string;

  @Expose()
  isDeleted: boolean;

  @Expose()
  status: number;

  @Expose()
  position: number;

  @Transform(({ obj }) => obj?.author)
  @Type(() => UserDto)
  @Expose()
  author: UserDto;

  @Expose()
  createdAt: string;

  @Expose()
  updateAt: string;

  @Expose()
  deletedAt: string;
}