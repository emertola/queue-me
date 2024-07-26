import { Router } from 'express';
import authRouter from './auth.route';
import ticketRouter from './ticket.route';
import servingWindowRouter from './serving-window.route';

const router = Router();

router.use('/auth', authRouter);
router.use('/ticket', ticketRouter);
router.use('/windows', servingWindowRouter);

export default router;
