import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { Ticket } from '../schemas';
import { ApiResponse } from '../models';

export const addTicket = async (req: Request, res: Response<ApiResponse>) => {
  const data: Record<string, any> = matchedData(req, {
    includeOptionals: false,
  });

  const count = await Ticket.countDocuments();

  const newTicket = new Ticket({ ...data, ticketNumber: count + 1 });
  await newTicket.save();

  res
    .status(200)
    .send({
      data: { ...newTicket.toObject() },
      message: 'Request successful!',
    });
};
