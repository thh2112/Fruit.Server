import { BadRequestException, ValidationError } from '@nestjs/common';
import { IErrorResponse } from 'src/_core/interfaces';
import { SYSTEM_ERROR_CODE } from 'src/constants/consts/system.constant';

export class ValidationException extends BadRequestException {
  private result: IErrorResponse<null>;

  constructor(private readonly errors: ValidationError[]) {
    super(errors);
  }

  getResponse() {
    if (!this.errors || this.errors.length === 0) {
      this.result = {
        errorMessage: SYSTEM_ERROR_CODE.CODE[400],
        success: false,
        data: null,
        errorMessageCode: '',
      };
    }

    if (this.errors && this.errors.length > 0) {
      this.result = {
        errorMessage: '',
        success: false,
        data: null,
        errorMessageCode: '',
      };
    }

    return this.result;
  }
}
