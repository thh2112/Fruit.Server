declare namespace Express {
  interface Request {
    user: import('../../modules/features/user/dtos/user.dto');
    payload: import('../interfaces').IAuthPayload;
  }
}
