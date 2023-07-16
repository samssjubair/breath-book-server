import { z } from 'zod';

const createBookSchema = z.object({
  body: z.object({
    addedBy: z.string().nonempty(),
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

const addReviewSchema = z.object({
  body: z.object({
    comment: z.string().nonempty().min(1),
  }),
});

export const BookValidation = {
  createBookSchema,
  updateBookSchema,
  addReviewSchema,
};
