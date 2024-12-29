import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IAuthPayload } from 'src/_core/interfaces';

export const AuthenticatedPayload = createParamDecorator((data: unknown, context: ExecutionContext): IAuthPayload => {
  const request = context.switchToHttp().getRequest();
  return request?.payload;
});
