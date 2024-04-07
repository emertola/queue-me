import { Request, Response } from 'express';
import { CreateUserDto } from '../dtos';
import { BaseResponse } from '../types';
import { User } from '../types';

export const getAllUsers = (request: Request, response: Response) => {
  response.send([]);
};

export const getUserById = (request: Request, response: Response) => {
  response.send({});
};

export const createUser = (
  request: Request<{}, {}, CreateUserDto>,
  response: Response<BaseResponse<User>>
) => {
  response.status(201).send({
    data: { id: 1, username: 'emertola', email: 'emertola@gmail.com' },
    message: 'User successfully created!',
  });
};
