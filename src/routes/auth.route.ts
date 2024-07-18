import { Router } from 'express';
import { checkSchema } from 'express-validator';
import passport from 'passport';
import { loginValidationSchema, signUpValidationSchema } from '../validations';
import { handleValidationErrors } from '../middlewares';
import { loginUser, signUpUser } from '../controllers';

const router = Router();

router.post(
  '/signup',
  checkSchema(signUpValidationSchema),
  handleValidationErrors,
  signUpUser
);

router.post(
  '/login',
  checkSchema(loginValidationSchema),
  handleValidationErrors,
  passport.authenticate('local', { session: false }),
  loginUser
);

export default router;
