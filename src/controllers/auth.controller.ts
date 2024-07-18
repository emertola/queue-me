import { Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';
import { hashPassword } from '../utils';
import { AuthLocalUser } from '../schemas/user.schema';
import jwt from 'jsonwebtoken';
import { IAuthUser } from '../models';

export const signUpUser = async (req: Request, res: Response) => {
  const { email } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const isExistingEmail = await AuthLocalUser.findOne({ email });

  if (isExistingEmail) {
    return res.status(400).send({ message: 'Email already exists' });
  }

  const data: Record<string, any> = matchedData(req, {
    includeOptionals: false,
  });
  data.password = hashPassword(data.password);

  const newAuthLocalUser = new AuthLocalUser(data);

  try {
    const savedUser = await newAuthLocalUser.save();
    const { password, ...userWithoutPassword } = savedUser.toObject();
    return res.status(201).send(userWithoutPassword);
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Error signing up the user', error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const customUser = req.user as IAuthUser;
    const token = jwt.sign(
      {
        id: customUser._id,
      },
      process.env.JWT_SECRET as string
    );
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send({ message: 'Error logging in', error });
  }
};
