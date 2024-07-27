import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiResponse, IAuthUser } from '../models';

export const verifyAuth = (
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      data: { error: 'No token provided.' },
      message: 'Request failed.',
    });
  }
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        data: { error: err },
        message: 'Failed to authenticate token.',
      });
    }

    req.user = decoded as IAuthUser;
    next();
  });
};
