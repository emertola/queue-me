import { Router } from 'express';
import { createUserHandler, getAllUsers, getUserById } from '../handlers';
import { checkSchema } from 'express-validator';
import { createUserValidationSchema } from '../utils';

const router = Router();

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.post(
  '/create',
  checkSchema(createUserValidationSchema),
  createUserHandler
);

export default router;
