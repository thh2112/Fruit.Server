import { instanceToPlain, plainToInstance } from 'class-transformer';

export function transformDtoToPlainObject<T, V>(instance: new () => T, plainObject: V) {
  const dtoInstance = plainToInstance(instance, plainObject);

  return instanceToPlain(dtoInstance) as unknown as T;
}
