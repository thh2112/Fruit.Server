import { ArgumentsHost, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { first } from 'lodash';
import _map from 'lodash/map';
import { I18nContext, I18nTranslation } from 'nestjs-i18n';
import { IErrorResponse } from 'src/_core/interfaces';
import { SYSTEM_ERROR_CODE } from 'src/constants/consts';

@Injectable()
export class SystemUtil {
  private static systemUtilIns: SystemUtil;
  constructor() {}
  public getKeyOfObject(obj: object, value) {
    return Object.keys(obj).find(key => obj[key] === value);
  }

  public static getIns() {
    if (!this.systemUtilIns) {
      this.systemUtilIns = new SystemUtil();
    }

    return this.systemUtilIns;
  }

  public i18nConvertMessageError(payload: IErrorResponse<null>, status: number, host: ArgumentsHost) {
    const result = payload.errorMessage.split(', ');

    const i18nInstance = I18nContext.current<I18nTranslation>(host);
    if (!i18nInstance) {
      throw new InternalServerErrorException(SYSTEM_ERROR_CODE.EXH.EXH_ERR_001);
    }

    if (Array.isArray(result)) {
      return _map(result, err => this.convertMessageError(err, i18nInstance))?.join(', ');
    } else {
      return this.convertMessageError(result, i18nInstance);
    }
  }

  private convertMessageError(errorMessage: string, i18nInstance: I18nContext<I18nTranslation>) {
    const errMessageArrays = errorMessage?.split('.');
    let pathI18n = null;
    if (errMessageArrays.length <= 1) {
      pathI18n = `${'SYSTEM_ERROR_CODE'.toLowerCase()?.replace(/_/g, '-')}.CODE.${HttpStatus.INTERNAL_SERVER_ERROR}`;
    } else {
      const prefixErrMessage = first(errMessageArrays)?.toLowerCase()?.replace(/_/g, '-');
      errMessageArrays.shift();
      pathI18n = `${prefixErrMessage}.${errMessageArrays.join('.')}`;
    }
    const messageI18n = i18nInstance.t(pathI18n as never, {
      lang: i18nInstance.lang,
    });

    return messageI18n;
  }
}
