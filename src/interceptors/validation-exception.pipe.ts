import { BadRequestException, HttpStatus, ValidationError } from '@nestjs/common';
import _map from 'lodash/map';
import { IErrorResponse } from 'src/_core/interfaces';
import { SYSTEM_ERROR_CODE } from 'src/constants/consts/system.constant';
import { SystemUtil } from 'src/shared/utils/system.util';

export class ValidationException extends BadRequestException {
  private result: IErrorResponse<null> = {
    success: false,
    data: null,
    errorMessage: SYSTEM_ERROR_CODE.CODE[400],
    errorMessageCode: '',
  };

  constructor(private readonly errors: ValidationError[]) {
    super(errors);
  }

  getResponse() {
    if (this.errors) {
      const errorObj: Array<IErrorResponse<null>> = _map(this.errors, err => {
        const constraints = Object.values(err.constraints).join(', ') || SYSTEM_ERROR_CODE.CODE[400];
        const resultTemp = {
          errorMessage: constraints,
          success: false,
          data: null,
          errorMessageCode: constraints,
        };
        const messageI18n = SystemUtil.getIns().i18nConvertMessageError(resultTemp, HttpStatus.BAD_REQUEST, null);

        resultTemp.errorMessage = messageI18n;
        return resultTemp;
      });

      this.result = {
        ...this.result,
        errorMessage: _map(errorObj, err => err.errorMessage).join(', '),
        errorMessageCode: _map(errorObj, err => err.errorMessageCode).join(', '),
      };
    }

    return this.result;
  }
}
