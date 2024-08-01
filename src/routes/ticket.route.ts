import { Router } from "express";
import { checkSchema } from "express-validator";
import {
  assignTicketValidationSchema,
  ticketValidationSchema,
} from "../validations";
import { handleValidationErrors, verifyAuth } from "../middlewares";
import { addTicket, assignTicket, getTicketsPagedList } from "../controllers";

const router = Router();

router.post(
  "/add",
  verifyAuth,
  checkSchema(ticketValidationSchema),
  handleValidationErrors,
  addTicket
);

router.get("/list", verifyAuth, getTicketsPagedList);
router.post(
  "/assign",
  verifyAuth,
  checkSchema(assignTicketValidationSchema),
  assignTicket
);

export default router;
