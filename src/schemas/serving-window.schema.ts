import { Model, model, Schema } from 'mongoose';
import { ServingWindow } from '../models';
import { WindowStatus } from '../enums';

const SWindowSchema = new Schema<ServingWindow>({
  windowStatus: {
    type: String,
    default: WindowStatus.INACTIVE,
  },
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
