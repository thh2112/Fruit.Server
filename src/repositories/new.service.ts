import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { BaseService } from 'src/_core/interfaces';
import { transformDtoToPlainObject } from 'src/shared/helpers/transform';
import { PrismaService } from 'src/shared/providers';
import { UserService } from './user.service';
import { CreateNewDto } from './dtos/new/create-new.dto';
import { NewDto } from './dtos/new/new.dto';

@Injectable()
export class NewService implements BaseService<NewDto> {
  constructor(
    private readonly prismaService: PrismaService,
    private userService: UserService,
  ) {}

  async create(dto: CreateNewDto): Promise<NewDto> {
    try {
      const { caption, content, thumbnail, position, status, userId } = dto;

      const foundUser = await this.userService.findOneById(userId);
      if (!foundUser) {
        throw new UnprocessableEntityException();
      }

      const newObj = await this.prismaService.new.create({
        data: {
          caption,
          content,
          thumbnail,
          position,
          status,
          author: {
            connect: {
              id: userId,
            },
          },
        },
        include: {
          author: true,
        },
      });

      console.log('new', newObj);

      return transformDtoToPlainObject(NewDto, newObj);
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: number): Promise<NewDto> {
    try {
      const foundNew = await this.prismaService.new.findUnique({
        where: { id },
        include: {
          author: true,
        },
      });

      if (!foundNew) {
        return null;
      }

      return transformDtoToPlainObject(NewDto, foundNew);
    } catch (error) {
      throw error;
    }
  }
}
