import { Document } from 'mongoose';

export interface UserName extends Document {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface IAuthUser extends Document {
  firstName: string;
  middleName?: string;
  lastName: string;
  mobile?: string;
  email: string;
  password: string;
  roles?: string[];
  assignedWindow?: number;
  id?: string;
  _id?: string;
}
