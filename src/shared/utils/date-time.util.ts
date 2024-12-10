import moment from 'moment';
import { DATE_TIME_FORMAT } from 'src/constants/consts';

interface FormatDateOptions {
  format?: string;
  keepLocalTime?: boolean;
}

export class DateTimeUtil {
  private static dateTimeUtilIns = new DateTimeUtil();

  public static getIns() {
    if (!this.dateTimeUtilIns) {
      this.dateTimeUtilIns = new DateTimeUtil();
    }

    return this.dateTimeUtilIns;
  }

  getDateTimeFormat(date?: string, option?: FormatDateOptions) {
    const { format, keepLocalTime } = option ?? {};
    return moment(date)
      .utc(keepLocalTime)
      .format(format ?? DATE_TIME_FORMAT);
  }
}
