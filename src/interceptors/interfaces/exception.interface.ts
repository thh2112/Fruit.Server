import { ArgumentsHost, HttpException, ValidationError } from '@nestjs/common';
import { IErrorResponse } from 'src/_core/interfaces';
import { Response } from 'express';

export interface ExceptionHandler {
  handle(exception: HttpException, host: ArgumentsHost, response: Response<any, Record<string, any>>): boolean;
}

export interface IErrorHandler {
  getResponse(): string | object;
  buildErrorResponse(): IErrorResponse<null>;
}

export interface IErrorValidationHandler extends IErrorHandler {
  transformValidationError(error: ValidationError): IErrorResponse<null>;
}

export interface IErrorPrismaHandler extends IErrorHandler {}
export interface IErrorForbiddenHandler extends IErrorHandler {}
