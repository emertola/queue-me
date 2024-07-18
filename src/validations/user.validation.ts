import { Schema } from 'express-validator';

export const loginValidationSchema: Schema = {
  email: {
    isString: true,
    notEmpty: {
      errorMessage: 'Email must not be empty.',
    },
    isEmail: {
      errorMessage: 'Must be a valid email.',
    },
  },
  password: {
    isString: true,
    notEmpty: {
      errorMessage: 'Password must not be empty.',
    },
    isLength: {
      options: {
        min: 8,
      },
      errorMessage: 'Must be at least 8 characters.',
    },
  },
};

export const signUpValidationSchema: Schema = {
  ...loginValidationSchema,
  firstName: {
    isString: true,
    notEmpty: {
      errorMessage: 'First Name must not be empty.',
    },
    isLength: {
      options: {
        min: 2,
      },
      errorMessage: 'Must be at least 2 characters.',
    },
  },
  middleName: {
    optional: {
      options: { values: 'falsy' },
    },
    isLength: {
      options: {
        min: 2,
      },
      errorMessage: 'Must be at least 2 characters.',
    },
  },
  lastName: {
    isString: true,
    notEmpty: {
      errorMessage: 'Last Name must not be empty.',
    },
    isLength: {
      options: {
        min: 2,
      },
      errorMessage: 'Must be at least 2 characters.',
    },
  },
};
