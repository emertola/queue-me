import { Request, Response } from "express";
import { CreateUserDto } from "../dtos";
import { BaseResponse, User } from "../types";
import {
  ValidationError,
  matchedData,
  validationResult,
} from "express-validator";
import { hashPassword } from "../utils";
import { User as UserSchema } from "../mongoose/schemas/user.schema";

export const getAllUsers = async (request: Request, response: Response) => {
  if (!request.user) {
    return response.sendStatus(401);
  } else {
    return await UserSchema.find().then((users) => response.send(users));
  }
};

export const getUserById = (request: Request, response: Response) => {
  response.send({});
};

export const createUserHandler = async (
  request: Request<{}, {}, CreateUserDto>,
  response: Response<BaseResponse<User | ValidationError[]>>
) => {
  const result = validationResult(request);

  if (!result.isEmpty()) {
    return response.status(400).send({
      data: result.array(),
      message: "Error creating the user!",
    });
  }

  const data: Record<string, any> = matchedData(request, {
    includeOptionals: false,
  });
  data.password = hashPassword(data.password);

  const newUser = new UserSchema(data);

  try {
    const savedUser = await newUser.save();
    return response.status(201).send({
      data: savedUser.toObject(),
      message: "User successfully created!",
    });
  } catch (error) {
    return response.sendStatus(400);
  }
};
