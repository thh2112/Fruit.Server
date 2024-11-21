import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  public static SALT_ROUNDS = 10;

  async hash(plainPassword: string, saltRound = HashingService.SALT_ROUNDS): Promise<string> {
    return await bcrypt
      .hash(plainPassword, saltRound)
      .then(hash => {
        return hash;
      })
      .catch(err => {
        throw err;
      });
  }

  public async compare(plainPassword: string, hashPassword: string): Promise<boolean> {
    return await bcrypt
      .compare(plainPassword, hashPassword)
      .then(result => {
        return result === true;
      })
      .catch(err => {
        throw err;
      });
  }
}
