import { Router } from 'express';
import employeeRouter from './employee.route';
import authRouter from './auth.route';
import pokemonRouter from './pokemon.route';
import userRouter from './user.route';

const router = Router();

router.use('/auth/', authRouter);
router.use(employeeRouter);
router.use(pokemonRouter);
router.use('/users/', userRouter);

export default router;
