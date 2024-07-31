import { Request, Response } from 'express';
import { ApiResponse } from '../models';
import { SWindow } from '../schemas/serving-window.schema';
import { matchedData } from 'express-validator';

export const getWindowList = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  let filterOptions: { [key: string]: any } = {};

  try {
    const { unassignedOnly } = req.query;
    if ((unassignedOnly as string)?.toLowerCase() === 'true') {
      filterOptions = {
        ...filterOptions,
        $or: [
          { assignedPersonnelId: { $exists: false } },
          { assignedPersonnelId: null },
        ],
      };
    }
    const servingWindows = await SWindow.find(filterOptions).populate(
      'nowServing',
      'ticketNumber isPriority status'
    );

    res.status(200).send({
      data: servingWindows,
      message: 'Request successful!',
    });
  } catch (error) {
    res.status(500).send({ message: 'Request failed.', data: { error } });
  }
};

export const addWindow = async (req: Request, res: Response<ApiResponse>) => {
  try {
    const { windowName } = req.body;

    const isExistingWindow = await SWindow.findOne({ windowName });

    if (isExistingWindow) {
      return res.status(400).send({
        data: { error: 'Window Name already exists.' },
        message: 'Request failed.',
      });
    }

    const data: Record<string, any> = matchedData(req, {
      includeOptionals: false,
    });

    const newWindow = new SWindow(data);
    await newWindow.save();

    res.status(200).send({
      data: { ...newWindow.toObject() },
      message: 'Request successful!',
    });
  } catch (error) {
    res.status(500).send({ message: 'Request failed.', data: { error } });
  }
};
