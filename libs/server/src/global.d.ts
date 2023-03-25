declare namespace Express {
  export interface Request extends import('express').Request {
    user?: {
      id: string;
      username: string;
      email: string;
    };
  }
}
