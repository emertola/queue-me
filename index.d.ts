import * as express from 'express';
import { IAuthUser } from './src/models';

declare global {
  namespace Express {
    interface Request {
      user: IAuthUser;
    }
  }
}
