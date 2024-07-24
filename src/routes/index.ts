import { Router } from 'express';
import authRouter from './auth.route';
import ticketRouter from './ticket.route';

const router = Router();

router.use('/auth', authRouter);
router.use('/ticket', ticketRouter);

export default router;
