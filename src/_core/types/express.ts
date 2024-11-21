declare namespace Express {
  interface Request {
    payload: import('../../_core/interfaces').IAuthPayload;
  }
}
