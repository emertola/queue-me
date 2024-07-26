import { Schema } from 'express-validator';

export const windowValidationSchema: Schema = {
  windowName: {
    isString: true,
    notEmpty: {
      errorMessage: 'Must not be empty.',
    },
  },
};
