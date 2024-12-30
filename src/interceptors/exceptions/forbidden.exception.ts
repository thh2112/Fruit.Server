import { ArgumentsHost, ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionHandler, IErrorForbiddenHandler } from '../interfaces';
import { IErrorResponse } from 'src/_core/interfaces';
import { SYSTEM_ERROR_CODE } from 'src/constants/consts';
import { SystemUtil } from 'src/shared/utils';

export class CustomForbiddenException extends ForbiddenException implements IErrorForbiddenHandler {
  private result: IErrorResponse<null> = {
    success: false,
    data: null,
    errorMessage: SYSTEM_ERROR_CODE.CODE[403],
    errorMessageCode: '' + HttpStatus.FORBIDDEN,
  };

  constructor() {
    super();

    this.result = this.buildErrorResponse();
  }

  buildErrorResponse(): IErrorResponse<null> {
    const messageI18n = SystemUtil.getIns().i18nConvertMessageError(this.result, HttpStatus.FORBIDDEN, null);
    this.result.errorMessage = messageI18n;

    return {
      ...this.result,
      errorMessage: messageI18n,
    };
  }

  getResponse(): string | object {
    return this.result;
  }
}

export class ForbiddenExceptionHandler implements ExceptionHandler {
  handle(exception: HttpException, host: ArgumentsHost, response: any): boolean {
    if (exception instanceof CustomForbiddenException) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(exception.getResponse());
    }
    return false;
  }
}
