import { Request, Response } from "express";
import { ApiResponse } from "../models";
import { SWindow } from "../schemas/serving-window.schema";
import { matchedData } from "express-validator";
import { WindowStatus } from "../enums";

export const getWindowList = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  let query: { [key: string]: any } = {};

  try {
    const { unassignedOnly, noActiveTicket, activeOnly } = req.query;
    if ((unassignedOnly as string)?.toLowerCase() === "true") {
      query.$or = [
        { assignedPersonnelId: { $exists: false } },
        { assignedPersonnelId: null },
      ];
    }
    if ((noActiveTicket as string)?.toLowerCase() === "true") {
      query.nowServing = { $exists: false, $eq: null };
    }
    if ((activeOnly as string)?.toLowerCase() === "true") {
      query.windowStatus = { $exists: true, $eq: WindowStatus.ACTIVE };
    }

    const filterOptions: { $and?: any[] } = {};

    if (Object.keys(query).length > 0) {
      filterOptions.$and = Object.keys(query).map((key) => ({
        [key]: query[key],
      }));
    }

    const servingWindows = await SWindow.find(filterOptions)
      .populate("nowServing", "ticketNumber isPriority status")
      .populate("assignedPersonnelId");

    res.status(200).send({
      data: servingWindows,
      message: "Request successful!",
    });
  } catch (error) {
    res.status(500).send({ message: "Request failed.", data: { error } });
  }
};

export const addWindow = async (req: Request, res: Response<ApiResponse>) => {
  try {
    const { windowName } = req.body;

    const isExistingWindow = await SWindow.findOne({ windowName });

    if (isExistingWindow) {
      return res.status(400).send({
        data: { error: "Window Name already exists." },
        message: "Request failed.",
      });
    }

    const data: Record<string, any> = matchedData(req, {
      includeOptionals: false,
    });

    const newWindow = new SWindow(data);
    await newWindow.save();

    res.status(200).send({
      data: { ...newWindow.toObject() },
      message: "Request successful!",
    });
  } catch (error) {
    res.status(500).send({ message: "Request failed.", data: { error } });
  }
};
