import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { ticketValidationSchema } from '../validations';
import { handleValidationErrors } from '../middlewares';
import { addTicket } from '../controllers';

const router = Router();

router.post(
  '/add',
  checkSchema(ticketValidationSchema),
  handleValidationErrors,
  addTicket
);

export default router;
