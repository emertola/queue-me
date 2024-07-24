import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { hashPassword } from '../utils';
import { User } from '../schemas/user.schema';
import jwt from 'jsonwebtoken';
import { ApiResponse, IAuthUser } from '../models';

export const signUpUser = async (req: Request, res: Response<ApiResponse>) => {
  const { email } = req.body;

  const isExistingEmail = await User.findOne({ email });

  if (isExistingEmail) {
    return res.status(400).send({
      data: { error: 'Email already exists.' },
      message: 'Request failed.',
    });
  }

  const data: Record<string, any> = matchedData(req, {
    includeOptionals: false,
  });
  data.password = hashPassword(data.password);

  const newUser = new User(data);

  try {
    const savedUser = await newUser.save();
    const { password, ...userWithoutPassword } = savedUser.toObject();
    return res
      .status(201)
      .send({ data: userWithoutPassword, message: 'Request successful!' });
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Error signing up the user', data: { error } });
  }
};

export const loginUser = async (req: Request, res: Response<ApiResponse>) => {
  try {
    const customUser = req.user as IAuthUser;
    const token = jwt.sign(
      {
        id: customUser._id,
      },
      process.env.JWT_SECRET as string
    );
    res.status(200).send({ data: { token }, message: 'Request successful!' });
  } catch (error) {
    res.status(500).send({ message: 'Error logging in', data: { error } });
  }
};
