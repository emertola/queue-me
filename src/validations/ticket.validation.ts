import { Schema } from "express-validator";

export const ticketValidationSchema: Schema = {
  isPriority: {
    optional: {
      options: { values: "falsy" },
    },
    isBoolean: {
      errorMessage: "This field is required.",
    },
    exists: {
      errorMessage: "Missing isPriority field.",
    },
  },
  firstName: {
    optional: {
      options: { values: "falsy" },
    },
    isLength: {
      options: {
        min: 2,
      },
      errorMessage: "First Name must be at least 2 characters.",
    },
  },
  lastName: {
    optional: {
      options: { values: "falsy" },
    },
    isLength: {
      options: {
        min: 2,
      },
      errorMessage: "Last Name must be at least 2 characters.",
    },
  },
};

export const assignTicketValidationSchema: Schema = {
  ticket: {
    notEmpty: {
      errorMessage: "Queue/Ticket must be provided.",
    },
  },
  personnelId: {
    isString: true,
    notEmpty: {
      errorMessage: "Personnel ID must be provided.",
    },
  },
};
