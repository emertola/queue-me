export const createUserValidationSchema = {
  username: {
    notEmpty: true,
    isString: true,
    isLength: {
      options: {
        min: 5,
        max: 20,
      },
      withMessage:
        "Username must be at least 5 characters, but not more than 20 characters.",
    },
  },
};
