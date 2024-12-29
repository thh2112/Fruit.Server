import { JwtSignOptions } from '@nestjs/jwt';

export interface IToken<T> {
  setPayload(data: T): void;
  setOption(options: JwtSignOptions): void;
  create(): string;
}
