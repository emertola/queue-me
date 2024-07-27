import { Request, Response } from 'express';
import { ApiResponse } from '../models';
import { SWindow } from '../schemas/serving-window.schema';
import { matchedData } from 'express-validator';

export const getWindowList = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  try {
    const servingWindows = await SWindow.find().populate(
      'nowServing',
      'ticketNumber isPriority'
    );

    res.status(200).send({
      data: { result: servingWindows },
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
