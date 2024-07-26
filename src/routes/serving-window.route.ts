import { Router } from 'express';
import { addWindow, getWindowList } from '../controllers';
import { checkSchema } from 'express-validator';
import { windowValidationSchema } from '../validations';
import { handleValidationErrors, verifyAuth } from '../middlewares';

const router = Router();

router.get('/list', getWindowList);
router.post(
  '/add',
  verifyAuth,
  checkSchema(windowValidationSchema),
  handleValidationErrors,
  addWindow
);

export default router;
