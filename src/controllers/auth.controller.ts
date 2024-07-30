import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { hashPassword } from '../utils';
import { User } from '../schemas/user.schema';
import jwt from 'jsonwebtoken';
import { ApiResponse, IAuthUser } from '../models';
import { Gender } from '../enums';

export const signUpUser = async (req: Request, res: Response<ApiResponse>) => {
  const { email, gender } = req.body;

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

  let boyOrGirl = gender === Gender.FEMALE ? 'girl' : 'boy';
  data.imgUrl = `https://avatar.iran.liara.run/public/${boyOrGirl}`;
  data.gender = gender;

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

export const currentUser = async (req: Request, res: Response<ApiResponse>) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const userId = (req.user as IAuthUser).id;
    const user = await User.findById(userId, '-password');

    if (!user) {
      return res
        .status(404)
        .send({ data: 'User not found!', message: 'Request failed.' });
    }

    res.status(200).send({ data: user, message: 'Request successful!' });
  } catch (error) {
    res.status(500).send({ data: { error }, message: 'Request failed.' });
  }
};
