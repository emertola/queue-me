import { Router } from 'express';
import authRouter from './auth.route';
import ticketRouter from './ticket.route';
import servingWindowRouter from './serving-window.route';
import personnelRouter from './personnel.route';

const router = Router();

router.use('/auth', authRouter);
router.use('/ticket', ticketRouter);
router.use('/windows', servingWindowRouter);
router.use('/personnel', personnelRouter);

export default router;
