import { CallHandler, ExecutionContext, Inject, NestInterceptor } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Observable } from 'rxjs';
import { cryptoConfig } from 'src/configs/configuration';
import { CryptoUtil } from 'src/shared/utils';

export class DecryptChangePasswordPayload implements NestInterceptor {
  constructor(@Inject(cryptoConfig.KEY) private readonly cryptoConf: ConfigType<typeof cryptoConfig>) {}
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { currentPassword, newPassword } = request.body ?? {};

    const payload = {
      currentPassword: CryptoUtil.getIns().init(this.cryptoConf).decrypted(currentPassword),
      newPassword: CryptoUtil.getIns().init(this.cryptoConf).decrypted(newPassword),
    };

    request.body = payload;
    return next.handle();
  }
}
