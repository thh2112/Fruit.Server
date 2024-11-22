import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import _last from 'lodash/last';
import { IErrorResponse } from 'src/_core/interfaces';
import { PRISMA_ERROR_CODE } from 'src/constants/consts';

import { ValidationException } from './validation-exception.pipe';

@Catch(HttpException)
export class AllExceptionFilter implements ExceptionFilter {
  constructor(protected readonly configService?: ConfigService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorMessage: string = exception.message;
    const errorMessageCode = _last(errorMessage?.split('.'));

    const result: IErrorResponse<null> = {
      errorMessage: errorMessage,
      success: false,
      data: null,
      errorMessageCode: errorMessageCode,
      path: request.url,
    };

    // Validation Exception
    if (exception instanceof ValidationException) {
      return response.status(HttpStatus.BAD_REQUEST).json(exception.getResponse());
    }

    //Prisma Exception
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      if (exception.code === PRISMA_ERROR_CODE.ERROR_2014 || exception.code === PRISMA_ERROR_CODE.ERROR_2003) {
        result.errorMessage = exception.message;
      }
    }

    return response.status(status).json(result);
  }
}
