import { Document } from "mongoose";
import { Gender } from "../enums";
import { ITicket } from "./ticket.model";

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
  gender: Gender;
  imgUrl?: string;
  active: boolean;
  assignedTickets?: ITicket[];
}
