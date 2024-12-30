import { ArgumentsHost, Catch, ExceptionFilter, ForbiddenException, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

import { ForbiddenExceptionHandler } from './exceptions/forbidden.exception';
import { PrismaException, PrismaExceptionHandler } from './exceptions/prisma.exception';
import { UnknownExceptionHandler } from './exceptions/unknown.exception';
import { ValidationException, ValidationExceptionHandler } from './exceptions/validation.exception';
import { ExceptionHandler } from './interfaces';

@Catch(HttpException)
export class AllExceptionFilter implements ExceptionFilter {
  private readonly handler: Record<string, ExceptionHandler> = {
    [ValidationException.name]: new ValidationExceptionHandler(),
    [ForbiddenException.name]: new ForbiddenExceptionHandler(),
    [PrismaException.name]: new PrismaExceptionHandler(),
    [HttpException.name]: new UnknownExceptionHandler(), // Handler mặc định
  };

  constructor(protected readonly configService?: ConfigService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const handler = this.handler[exception.constructor.name]?.handle(exception, host, response);

    if (handler) {
      return;
    }

    return new UnknownExceptionHandler().handle(exception, host, response);
  }
}
