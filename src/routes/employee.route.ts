import { Request, Response, Router } from 'express';
import { matchedData, validationResult, checkSchema } from 'express-validator';
import {
  createEmployeeSchema,
  employeeQuerySchema,
  employeeList,
} from '../utils';

const router = Router();

router.get('/employees', (req: Request, res: Response) => {
  res.status(200).send(employeeList);
});

router.post(
  '/employee',
  checkSchema(createEmployeeSchema),
  (req: Request, res: Response) => {
    const validationRes = validationResult(req);

    if (!validationRes.isEmpty()) {
      return res.status(400).send({ errors: validationRes.array() });
    }

    const matched = matchedData(req);
    const isExistingEmail = (email: string) =>
      employeeList.find((employee) => employee.email === email);
    try {
      if (!req.body.email) {
        const msg = 'Missing email!';
        throw new Error(msg);
      } else if (req.body.email && isExistingEmail(req.body.email)) {
        const msg = 'Employee with this email already exists!';
        throw new Error(msg);
      } else {
        const payload: any = {
          ...matched,
          id: Date.now(),
        };
        employeeList.push(payload);
        res.status(201).send(payload);
      }
    } catch (error: any) {
      res.status(400).send({ error: error?.message || error });
    }
    res.sendStatus(201);
  }
);

router.get('/employee/:id', (req: Request, res: Response) => {
  const { params } = req;
  const employee = employeeList.find((emp) => emp.id === +params.id);

  try {
    if (!employee) {
      throw new Error('Employee not found!');
    } else {
      res.status(200).send(employee);
    }
  } catch (error: any) {
    res.status(404).send({ error: error?.message || error });
  }
});

router.get(
  '/employee',
  checkSchema(employeeQuerySchema),
  (req: Request, res: Response) => {
    const validationRes = validationResult(req);

    if (!validationRes.isEmpty()) {
      return res.status(400).send({ errors: validationRes.array() });
    }
    const { query } = req;
    let results: any[] = [];
    Object.keys(query).forEach((key) => {
      const employeeItems = employeeList.filter(
        (employee: any) =>
          employee.hasOwnProperty(key) &&
          employee[key].toLowerCase().search(query[key]) >= 0
      );
      results = [...results, ...employeeItems];
    });

    res.cookie('queryParam', JSON.stringify(query), { maxAge: 10000 });

    res.status(200).send(results);
  }
);

export default router;
