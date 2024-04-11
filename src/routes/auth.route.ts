import { Request, Response, Router } from 'express';
import passport from 'passport';

const router = Router();

router.post(
  '/login',
  passport.authenticate('local'),
  (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);

router.post('/logout', (request: Request, response: Response) => {
  if (!request.user) {
    return response.sendStatus(401);
  }

  request.logout((error) => {
    if (error) {
      return response.sendStatus(400);
    }
    response.sendStatus(200);
  });
});

router.get('/status', (req: Request, res: Response) => {
  return req?.user ? res.send(req.user) : res.sendStatus(401);
});

export default router;
