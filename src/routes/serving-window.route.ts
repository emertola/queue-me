import { Router } from 'express';
import { getWindowList } from '../controllers';

const router = Router();

router.get('/list', getWindowList);

export default router;
