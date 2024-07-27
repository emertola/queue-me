import { Model, model, Schema } from 'mongoose';
import { ServingWindow } from '../models';

const SWindowSchema = new Schema<ServingWindow>({
  windowStatus: String,
  windowName: String,
  nowServing: {
    type: Schema.Types.ObjectId,
    ref: 'Ticket',
  },
  assignedPersonnelId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export const SWindow: Model<ServingWindow> = model('SWindow', SWindowSchema);
