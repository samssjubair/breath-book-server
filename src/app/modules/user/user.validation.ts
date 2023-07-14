import { z } from 'zod';

const createUserSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is required',
    }),
    role: z.union([
      z.literal('buyer'),
      z.literal('seller'),
      z.literal('admin'),
    ]),
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
    }),
    phoneNumber: z.string({
      required_error: 'Phone number is required',
    }),
    budget: z.number({}).optional(),
    income: z.number({}).optional(),
    address: z.string({
      required_error: 'Address is required',
    }),
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
    password: z
      .string({
        required_error: 'Password is required',
      })
      .optional(), // Optional for update
    role: z
      .union([z.literal('buyer'), z.literal('seller'), z.literal('admin')])
      .optional(), // Optional for update
    name: z
      .object({
        firstName: z
          .string({
            required_error: 'First name is required',
          })
          .optional(),
        lastName: z
          .string({
            required_error: 'Last name is required',
          })
          .optional(),
      })
      .optional(),
    phoneNumber: z
      .string({
        required_error: 'Phone number is required',
      })
      .optional(), // Optional for update
    budget: z
      .number({
        required_error: 'Budget is required',
      })
      .optional(), // Optional for update
    income: z
      .number({
        required_error: 'Income is required',
      })
      .optional(), // Optional for update
    address: z
      .string({
        required_error: 'Address is required',
      })
      .optional(), // Optional for update
  }),
});

const loginSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is required',
    }),
    phoneNumber: z.string({
      required_error: 'Phone number is required',
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required',
    }),
  }),
});

export const UserValidations = {
  createUserSchema,
  updateUserZodSchema,
  loginSchema,
  refreshTokenZodSchema,
};
