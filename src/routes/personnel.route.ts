import { Router } from 'express';
import { verifyAuth } from '../middlewares';
import { getPersonnelPagedList } from '../controllers';

const router = Router();

router.get('/list', verifyAuth, getPersonnelPagedList);

export default router;
