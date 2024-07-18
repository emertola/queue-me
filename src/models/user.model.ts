import { Document } from 'mongoose';

export interface IAuthUser extends Document {
  firstName: string;
  middleName?: string;
  lastName: string;
  mobile?: string;
  email: string;
  password: string;
  roles?: string[];
  _id?: string;
}
