import { Document } from 'mongoose';
import { TicketStatus } from '../enums';

export interface ITicket extends Document {
  _id?: string;
  ticketNumber?: number;
  status?: TicketStatus;
  window?: number;
  isPriority: boolean;
  firstName?: string;
  lastName?: string;
}
