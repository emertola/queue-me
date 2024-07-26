import { Request, Response } from 'express';
import { ApiResponse } from '../models';
import { SWindow } from '../schemas/serving-window.schema';

export const getWindowList = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  try {
    const servingWindows = await SWindow.find();
    console.log('serving Windows', servingWindows);
    res.status(200).send({
      data: { result: servingWindows },
      message: 'Request successful!',
    });
  } catch (error) {
    res.status(500).send({ message: 'Error logging in', data: { error } });
  }
};
