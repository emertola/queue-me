import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { Ticket } from '../schemas';
import { ApiResponse, IPaginated } from '../models';
import { SortOrder } from 'mongoose';

export const addTicket = async (req: Request, res: Response<ApiResponse>) => {
  const data: Record<string, any> = matchedData(req, {
    includeOptionals: false,
  });

  const count = await Ticket.countDocuments();

  const newTicket = new Ticket({ ...data, ticketNumber: count + 1 });
  await newTicket.save();

  res.status(200).send({
    data: { ...newTicket.toObject() },
    message: 'Request successful!',
  });
};

export const getTicketsPagedList = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 0;
  const limit = parseInt(req.query.size as string) || 10;
  const sort = req.query.sort as string;

  let sortOptions: { [key: string]: SortOrder } = {};
  let filterOptions: { [key: string]: any } = {};

  if (sort) {
    const [field, order] = sort.split(',');
    sortOptions[field.toLowerCase()] = order.toUpperCase() === 'DESC' ? -1 : 1;
  }

  try {
    const items = await Ticket.find(filterOptions, '-password')
      .sort(sortOptions)
      .skip(page * limit)
      .limit(limit);
    const count = await Ticket.countDocuments(filterOptions);
    const result: IPaginated = {
      currentPage: page,
      pageSize: limit,
      results: items,
      totalElements: count,
    };

    res.json(result);
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ error: 'Server error' });
    }
  }
};
