import { Request, Response } from 'express';
import { SortOrder } from 'mongoose';
import { SWindow, User } from '../schemas';
import { ApiResponse, IPaginated } from '../models';
import { WindowStatus } from '../enums';

export const getPersonnelPagedList = async (req: Request, res: Response) => {
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
    const items = await User.find(filterOptions, '-password')
      .sort(sortOptions)
      .skip((page < 0 ? 0 : page) * limit)
      .limit(limit);
    const count = await User.countDocuments(filterOptions);
    const totalPages = Math.ceil(count / limit);
    const hasNextPage = page + 1 < totalPages;
    const result: IPaginated = {
      currentPage: page < 0 ? 0 : page,
      pageSize: limit,
      results: items,
      totalElements: count,
      hasNextPage,
    };

    res.json(result);
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ error: 'Server error' });
    }
  }
};

export const assignWindow = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  const { windowId } = req.body;
  const { personnelId } = req.params;
  if (!windowId) {
    return res
      .status(400)
      .send({ data: 'No window id provided.', message: 'Request failed.' });
  }

  try {
    const updatedWindow = await SWindow.findByIdAndUpdate(
      windowId,
      { assignedPersonnelId: personnelId, windowStatus: WindowStatus.ACTIVE },
      { new: true }
    );
    if (!updatedWindow) {
      return res
        .status(400)
        .send({ data: 'Window not found.', message: 'Request failed.' });
    }
    const updatedPersonnel = await User.findByIdAndUpdate(
      personnelId,
      {
        assignedWindow: updatedWindow._id,
      },
      { new: true }
    );

    if (!updatedPersonnel) {
      return res
        .status(400)
        .send({ data: 'Personnel not found.', message: 'Request failed.' });
    }

    res.status(200).send({
      data: updatedPersonnel.toObject(),
      message: 'Request successful!',
    });
  } catch (error) {
    res.status(500).send({ data: { error }, message: 'Request failed.' });
  }
};
