import { ArgumentsHost, BadRequestException, HttpException, HttpStatus, ValidationError } from '@nestjs/common';
import _last from 'lodash/last';
import { IErrorResponse } from 'src/_core/interfaces';
import { SYSTEM_ERROR_CODE } from 'src/constants/consts';
import { SystemUtil } from 'src/shared/utils';
import { ExceptionHandler, IErrorValidationHandler } from '../interfaces';

export class ValidationException extends BadRequestException implements IErrorValidationHandler {
  private readonly result: IErrorResponse<null>;
  constructor(private readonly errors: ValidationError[]) {
    super(errors);
    this.result = this.buildErrorResponse();
  }

  buildErrorResponse(): IErrorResponse<null> {
    if (!this.errors || this.errors.length === 0) {
      return {
        success: false,
        data: null,
        errorMessage: SYSTEM_ERROR_CODE.CODE[400],
        errorMessageCode: '',
      };
    }

    const detailedErrors = this.errors.map(err => this.transformValidationError(err));
    return {
      success: false,
      data: null,
      errorMessage: detailedErrors.map(err => err.errorMessage).join(', '),
      errorMessageCode: detailedErrors.map(err => err.errorMessageCode).join(', '),
    };
  }

  transformValidationError(error: ValidationError): IErrorResponse<null> {
    const constraints = Object.values(error.constraints).join(', ') || SYSTEM_ERROR_CODE.CODE[400];
    const errorMessageCode = Object.values(error.constraints)
      .map(err => _last(err.split('.')))
      .join(', ');
    const resultTemp = {
      errorMessage: constraints,
      success: false,
      data: null,
      errorMessageCode: errorMessageCode,
    };
    const messageI18n = SystemUtil.getIns().i18nConvertMessageError(resultTemp, HttpStatus.BAD_REQUEST, null);
    resultTemp.errorMessage = messageI18n;
    return resultTemp;
  }

  getResponse(): string | object {
    return this.result;
  }
}

export class ValidationExceptionHandler implements ExceptionHandler {
  handle(exception: HttpException, host: ArgumentsHost, response: any): boolean {
    if (exception instanceof ValidationException) {
      response.status(HttpStatus.BAD_REQUEST).json(exception.getResponse());
      return true;
    }
    return false;
  }
}
