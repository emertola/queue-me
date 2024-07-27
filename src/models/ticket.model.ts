import mongoose, { Document } from 'mongoose';
import { TicketStatus } from '../enums';

export interface ITicket extends Document {
  _id?: string;
  ticketNumber?: number;
  status?: TicketStatus;
  servingWindow?: mongoose.Types.ObjectId;
  isPriority: boolean;
  firstName?: string;
  lastName?: string;
}
