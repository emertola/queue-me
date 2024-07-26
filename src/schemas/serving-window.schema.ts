import { Model, model, Schema } from 'mongoose';
import { ServingWindow } from '../models';
import { TicketSchema } from './ticket.schema';
import { UserSchema } from './user.schema';

const SWindowSchema = new Schema<ServingWindow>({
  windowStatus: String,
  windowNumber: Number,
  nowServing: TicketSchema,
  assignedPersonnel: UserSchema,
});

export const SWindow: Model<ServingWindow> = model('SWindow', SWindowSchema);
