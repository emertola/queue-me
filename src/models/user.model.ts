import { Document } from 'mongoose';

export interface UserName extends Document {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface IAuthUser extends UserName {
  mobile?: string;
  email: string;
  password: string;
  roles?: string[];
  assignedWindow?: number;
}
