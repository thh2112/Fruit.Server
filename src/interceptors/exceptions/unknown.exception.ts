import { HttpException, ArgumentsHost } from '@nestjs/common';
import { ExceptionHandler } from '../interfaces';
import { IErrorResponse } from 'src/_core/interfaces';

export class UnknownExceptionHandler implements ExceptionHandler {
  handle(exception: HttpException, host: ArgumentsHost, response: any): boolean {
    const status = exception.getStatus();
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    const result: IErrorResponse<null> = {
      errorMessage: exception.message,
      success: false,
      data: null,
      errorMessageCode: '',
      path: request.url,
    };

    const errorMessageCode = exception.message.split('.').pop() || '';
    result.errorMessageCode = errorMessageCode;
    result.errorMessage = exception.message;

    response.status(status).json(result);
    return true;
  }
}
