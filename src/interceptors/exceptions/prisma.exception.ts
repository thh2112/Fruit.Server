import { HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { ExceptionHandler, IErrorPrismaHandler } from '../interfaces';
import { Prisma } from '@prisma/client';
import { IErrorResponse } from 'src/_core/interfaces';

export class PrismaException extends Prisma.PrismaClientKnownRequestError implements IErrorPrismaHandler {
  private readonly result: IErrorResponse<null>;

  constructor(private readonly errors: Prisma.PrismaClientKnownRequestError) {
    super('', errors);
    this.result = this.buildErrorResponse();
  }

  getResponse(): string | object {
    return this.result;
  }
  buildErrorResponse(): IErrorResponse<null> {
    return {
      success: false,
      data: null,
      errorMessage: 'A database validation error occurred',
      errorMessageCode: 'UNKNOWN_ERROR',
    };
  }
}

export class PrismaExceptionHandler implements ExceptionHandler {
  handle(exception: HttpException, host: ArgumentsHost, response: any): boolean {
    if (exception instanceof PrismaException) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(exception.getResponse());
    }
    return false;
  }
}
