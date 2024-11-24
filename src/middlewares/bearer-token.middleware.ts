import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { FUNCTION_ERROR_CODE } from 'src/constants/consts';

@Injectable()
export class BearerTokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException(FUNCTION_ERROR_CODE.REP.REP_ERR_001);
    }
    next();
  }
}
