import { Model, model, Schema } from 'mongoose';
import { IAuthUser } from '../models';

const UserSchema = new Schema<IAuthUser>({
  firstName: {
    type: String,
  },
  middleName: String,
  lastName: {
    type: String,
  },
  mobile: String,
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  roles: {
    type: [String],
    default: [],
  },
  gender: String,
  imgUrl: String,
});

export const User: Model<IAuthUser> = model('User', UserSchema);
