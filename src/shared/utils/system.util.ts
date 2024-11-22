import { ArgumentsHost, HttpStatus, Injectable } from '@nestjs/common';
import { first, isEqual } from 'lodash';
import { I18nContext, I18nTranslation } from 'nestjs-i18n';
import { IErrorResponse } from 'src/_core/interfaces';

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
    let result = payload.errorMessage;

    if (Array.isArray(result)) {
      result = result.join(', ');
    }

    const i18nInstance = I18nContext.current<I18nTranslation>(host);

    if (typeof result !== 'string') {
      return JSON.stringify(result);
    }

    // message had format Ex: TRADING_SERVICE_ERROR_CODE.TS.TS_ERR_001
    const errMessageArrays = result?.split('.');
    const prefixErrMessage = first(errMessageArrays)?.toLowerCase()?.replace(/_/g, '-');
    errMessageArrays.shift();
    let pathI18n = `${prefixErrMessage}.${errMessageArrays.join('.')}`;
    const errorMessageArr = result.split('.');

    if (errorMessageArr.length <= 1) {
      // message no format => check status code to get message
      pathI18n = `${'SYSTEM_ERROR_CODE'.toLowerCase()?.replace(/_/g, '-')}.CODE.${status || HttpStatus.INTERNAL_SERVER_ERROR}`;
    }

    const messageI18n = i18nInstance.t(pathI18n as never, {
      lang: i18nInstance.lang,
    });

    if (!isEqual(messageI18n, pathI18n)) {
      result = messageI18n;
    }

    return result;
  }
}
