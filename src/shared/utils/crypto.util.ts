import { Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import CryptoJS from 'crypto-js';
import _split from 'lodash/split';
import { cryptoConfig } from 'src/configs/configuration';

@Injectable()
export class CryptoUtil {
  private static cryptoUtilIns: CryptoUtil;
  private cryptoSecretKey: string;
  private cryptoKeySize: string;

  init(cryptoConf: ConfigType<typeof cryptoConfig>) {
    this.cryptoSecretKey = cryptoConf.cryptoSecretKey;
    this.cryptoKeySize = cryptoConf.cryptoKeySize;
    return this;
  }

  static getIns() {
    if (!this.cryptoUtilIns) {
      this.cryptoUtilIns = new CryptoUtil();
    }
    return this.cryptoUtilIns;
  }

  private sanitizeUTF8(input: string): string {
    let output = '';
    for (let i = 0; i < input.length; i++) {
      const code = input.charCodeAt(i);
      if (code < 128) {
        output += input.charAt(i);
      } else if (code < 2048) {
        output += String.fromCharCode((code >> 6) | 192);
        output += String.fromCharCode((code & 63) | 128);
      } else {
        output += String.fromCharCode((code >> 12) | 224);
        output += String.fromCharCode(((code >> 6) & 63) | 128);
        output += String.fromCharCode((code & 63) | 128);
      }
    }
    return output;
  }

  private reverseSecretKey() {
    return _split(this.cryptoSecretKey, '').reverse().join('') || '';
  }

  encrypted(value: string): string {
    const sanitizedValue = this.sanitizeUTF8(value ?? '');
    const sanitizedKey = this.sanitizeUTF8(this.cryptoSecretKey ?? '');
    const sanitizedIv = this.sanitizeUTF8(this.reverseSecretKey());
    const key = CryptoJS.enc.Utf8.parse(sanitizedKey);
    const iv = CryptoJS.enc.Utf8.parse(sanitizedIv);

    const encrypted = CryptoJS.AES.encrypt(sanitizedValue, key, {
      keySize: this.cryptoKeySize,
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString();
    return encrypted;
  }

  decrypted(value: string): string {
    const sanitizedValue = this.sanitizeUTF8(value ?? '');
    const sanitizedKey = this.sanitizeUTF8(this.cryptoSecretKey ?? '');
    const sanitizedIv = this.sanitizeUTF8(this.reverseSecretKey());
    const key = CryptoJS.enc.Utf8.parse(sanitizedKey);
    const iv = CryptoJS.enc.Utf8.parse(sanitizedIv);

    const cipher = CryptoJS.AES.decrypt(sanitizedValue, key, {
      keySize: this.cryptoKeySize,
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return CryptoJS.enc.Utf8.stringify(cipher);
  }
}
