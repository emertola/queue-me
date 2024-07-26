import { Document } from 'mongoose';
import { WindowStatus } from '../enums';
import { ITicket } from './ticket.model';
import { IAuthUser } from './user.model';

export interface ServingWindow extends Document {
  windowStatus: WindowStatus;
  windowNumber: number;
  nowServing: ITicket;
  assignedPersonnel: IAuthUser;
}
