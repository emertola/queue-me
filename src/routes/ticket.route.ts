import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { ticketValidationSchema } from '../validations';
import { handleValidationErrors, verifyAuth } from '../middlewares';
import { addTicket, getTicketsPagedList } from '../controllers';

const router = Router();

router.post(
  '/add',
  verifyAuth,
  checkSchema(ticketValidationSchema),
  handleValidationErrors,
  addTicket
);

router.get('/list', verifyAuth, getTicketsPagedList);

export default router;
