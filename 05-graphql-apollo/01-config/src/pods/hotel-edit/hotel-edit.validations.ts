import { ValidationSchema, Validators } from '@lemoncode/fonk';
import { createFinalFormValidation } from '@lemoncode/fonk-final-form';
import { rangeNumber } from '@lemoncode/fonk-range-number-validator';

const validationSchema: ValidationSchema = {
  field: {
    name: [Validators.required],
    description: [Validators.required],
    rating: [
      Validators.required,
      {
        validator: rangeNumber,
        customArgs: {
          min: {
            value: 3,
            inclusive: true,
          },
          max: {
            value: 5,
            inclusive: true,
          },
        },
      },
    ],
    address: [Validators.required],
    city: [Validators.required],
  },
};

export const formValidation = createFinalFormValidation(validationSchema);
