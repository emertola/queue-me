export const createEmployeeSchema = {
	name: {
		isLength: {
			options: {
				min: 3,
			},
			errorMessage: 'Name field must be at least 3 characters!',
		},
		notEmpty: {
			errorMessage: 'Name field must not be empty!',
		},
	},
	email: {
		isEmail: {
			errorMessage: 'Must be a valid email!',
		},
		notEmpty: {
			errorMessage: 'Email field must not be empty!',
		},
		isLength: {
			options: {
				min: 3,
			},
			errorMessage: 'Email field must be at least 3 characters!',
		},
	},
};

export const employeeQuerySchema = {
	name: {
		notEmpty: {
			errorMessage: 'Must not be empty!',
		},
		isLength: {
			options: {
				min: 3,
			},
			errorMessage: 'Must be 3 characters minimum!',
		},
	},
};
