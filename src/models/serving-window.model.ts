import mongoose, { Document } from 'mongoose';
import { WindowStatus } from '../enums';

export interface ServingWindow extends Document {
  windowStatus: WindowStatus;
  windowName: string;
  nowServing?: mongoose.Types.ObjectId;
  assignedPersonnelId?: mongoose.Types.ObjectId;
}
