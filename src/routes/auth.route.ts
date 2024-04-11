import { Request, Response, Router } from 'express';
import passport from 'passport';

const router = Router();

router.post(
	'/auth/login',
	passport.authenticate('local'),
	(req: Request, res: Response) => {
		res.sendStatus(200);
	}
);

router.get('/auth/status', (req: Request, res: Response) => {
	return req?.user ? res.send(req.user) : res.sendStatus(401);
});

export default router;
