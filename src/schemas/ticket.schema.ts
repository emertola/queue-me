import { Model, model, Schema } from 'mongoose';
import { ITicket } from '../models';
import { TicketStatus } from '../enums';

export const TicketSchema = new Schema<ITicket>({
  ticketNumber: Number,
  status: {
    type: String,
    default: TicketStatus.PENDING,
  },
  window: Number,
  isPriority: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const Ticket: Model<ITicket> = model('Ticket', TicketSchema);
