import { Model, model, Schema } from 'mongoose';
import { IAuthUser } from '../models';
import { Gender } from '../enums';

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
  gender: {
    type: String,
    enum: Gender,
    required: true,
  },
  imgUrl: String,
  active: {
    type: Boolean,
    default: true,
  },
  assignedWindow: {
    type: Schema.Types.ObjectId,
    ref: 'SWindow',
  },
});

export const User: Model<IAuthUser> = model('User', UserSchema);
