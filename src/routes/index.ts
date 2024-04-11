import { Router } from 'express';
import employeeRouter from './employee.route';
import authRouter from './auth.route';
import pokemonRouter from './pokemon.route';

const router = Router();

router.use(authRouter);
router.use(employeeRouter);
router.use(pokemonRouter);

export default router;
