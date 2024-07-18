import { Model, model, Schema } from 'mongoose';
import { IAuthUser } from '../models';

const AuthLocalUserSchema = new Schema<IAuthUser>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: String,
  lastName: {
    type: String,
    required: true,
  },
  mobile: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    default: [],
  },
});

export const AuthLocalUser: Model<IAuthUser> = model(
  'AuthLocalUser',
  AuthLocalUserSchema
);
