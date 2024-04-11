import { NextFunction, Request, Response, Router } from 'express';
import { pokedex } from '../utils';

const router = Router();

// middleware
const paginatedResults = (model: any[]) => {
  return (request: Request, response: Response, next: NextFunction) => {
    const { page, size } = request.query;
    const currentPage = page ? +page : 0;
    const pageSize = size ? +size : 10;

    const startIndex = currentPage * pageSize;
    const endIndex = (currentPage + 1) * pageSize;

    const result: any = {};
    result.currentPage = currentPage;
    result.pageSize = pageSize;
    result.totalElements = model?.length || 0;
    result.results = model.slice(startIndex, endIndex);

    response.locals.pagedResults = result;
    next();
  };
};

router.get('/pokemon/list/all', (request: Request, response: any) => {
  response.json(pokedex);
});

router.get(
  '/pokemon/list',
  paginatedResults(pokedex),
  (request: Request, response: Response) => {
    response.json(response.locals?.pagedResults);
  }
);

export default router;
