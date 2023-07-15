import { z } from 'zod';

const createUserSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    })
  }),
});

const loginSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is required',
    }),
    email: z.string({
      required_error: 'Email is required',
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
  loginSchema,
  refreshTokenZodSchema,
};
