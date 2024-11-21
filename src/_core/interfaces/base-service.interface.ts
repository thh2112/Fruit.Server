import { IResponseSuccess } from './response-success';
import { Request } from 'express';

export interface BaseService<Dto> {
  create?(dto: Record<string, any>, req?: Request): Promise<Dto>;
  findOneById?(id: number, req?: Request): Promise<Dto>;
  findMany?(queryParams: Record<string, any>, req?: Request): Promise<Dto[]>;
  updateById?(id: number, dto: Record<string, any>, req?: Request): Promise<Dto>;
  deleteById?(id: number, req?: Request): Promise<null>;
  patchById?(id: number, dto: Record<string, any>, req?: Request): Promise<Dto>;
}
