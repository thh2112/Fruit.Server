import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponseSuccess } from 'src/_core/interfaces';

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, IResponseSuccess<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<IResponseSuccess<T>> {
    return next.handle().pipe(
      map(data => ({
        success: true,
        errorMessageCode: data?.errorMessageCode ?? '',
        errorMessage: data?.errorMessage || '',
        data: data.data,
        ...(data?.paging ? { paging: data.paging } : {}),
      })),
    );
  }
}
