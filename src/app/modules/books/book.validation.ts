import { z } from 'zod';

const createBookSchema = z.object({
  body: z.object({
    title: z.string().nonempty().min(1),
    author: z.string().nonempty().min(1),
    genre: z.enum(['fiction', 'non-fiction', 'comic', 'novel', 'other']),
    publicationYear: z.number()
  }),
});

const updateBookSchema = z.object({
  body: z.object({
    title: z.string().nonempty().min(1).optional(),
    author: z.string().nonempty().min(1).optional(),
    genre: z.enum(['fiction', 'non-fiction', 'comic', 'novel', 'other']).optional(),
    publicationYear: z.number().optional(),
  }),
});

export const BookValidation = {
  createBookSchema,
  updateBookSchema,
};
