import { Document } from 'mongoose';
import { WindowStatus } from '../enums';
import { ITicket } from './ticket.model';
import { UserName } from './user.model';

export interface ServingWindow extends Document {
  windowStatus: WindowStatus;
  windowName: string;
  nowServing?: ITicket;
  assignedPersonnel?: UserName;
}
