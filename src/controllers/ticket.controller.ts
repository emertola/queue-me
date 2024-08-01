import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { SWindow, Ticket, User } from "../schemas";
import { ApiResponse, IPaginated } from "../models";
import { SortOrder } from "mongoose";

export const addTicket = async (req: Request, res: Response<ApiResponse>) => {
  const data: Record<string, any> = matchedData(req, {
    includeOptionals: false,
  });

  let count = await Ticket.countDocuments();
  count = count < 1 ? 10000 : count + 10000;

  const newTicket = new Ticket({ ...data, ticketNumber: count + 1 });
  await newTicket.save();

  res.status(200).send({
    data: { ...newTicket.toObject() },
    message: "Request successful!",
  });
};

export const getTicketsPagedList = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 0;
  const limit = parseInt(req.query.size as string) || 10;
  const sort = req.query.sort as string;

  let sortOptions: { [key: string]: SortOrder } = {};
  let filterOptions: { [key: string]: any } = {};

  if (sort) {
    const [field, order] = sort.split(",");
    sortOptions[field.toLowerCase()] = order.toUpperCase() === "DESC" ? -1 : 1;
  }

  try {
    const items = await Ticket.find(filterOptions, "-password")
      .sort(sortOptions)
      .skip((page < 0 ? 0 : page) * limit)
      .limit(limit);
    const count = await Ticket.countDocuments(filterOptions);
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
      res.status(500).json({ error: "Server error" });
    }
  }
};

export const assignTicket = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  const { ticket, personnelId } = req.body;

  if (ticket?.servingWindow) {
    return res.status(400).send({
      data: `Queue item with id: ${ticket}, is already assigned to a window.`,
      message: "Request failed.",
    });
  }

  try {
    const updatedPersonnel = await User.findByIdAndUpdate(personnelId, {
      $addToSet: { assignedTickets: ticket._id },
    });
    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticket._id,
      { servingWindow: updatedPersonnel?.assignedWindow },
      { new: true }
    );
    const updatedWindow = await SWindow.findByIdAndUpdate(
      updatedPersonnel?.assignedWindow,
      { nowServing: ticket._id },
      { new: true }
    );

    if (!updatedTicket) {
      return res
        .status(400)
        .send({ data: "Queue ID not found.", message: "Request failed." });
    } else if (!updatedPersonnel) {
      return res
        .status(400)
        .send({ data: "Personnel not found.", message: "Request failed." });
    } else if (!updatedWindow) {
      return res
        .status(400)
        .send({ data: "Window not found.", message: "Request failed." });
    }

    res
      .status(200)
      .send({ data: updatedTicket.toObject(), message: "Request successful!" });
  } catch (error) {
    res.status(500).send({ data: { error }, message: "Request failed." });
  }
};
