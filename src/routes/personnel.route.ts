import { Router } from 'express';
import { verifyAuth } from '../middlewares';
import { assignWindow, getPersonnelPagedList } from '../controllers';

const router = Router();

router.get('/list', verifyAuth, getPersonnelPagedList);
router.put('/:personnelId', verifyAuth, assignWindow);

export default router;
