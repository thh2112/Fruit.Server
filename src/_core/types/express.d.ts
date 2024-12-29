declare namespace Express {
  interface Request {
    user: import('../../modules/common/user/dtos/user.dto');
    payload: import('../interfaces').IAuthPayload;
  }
}
