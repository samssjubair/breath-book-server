import { Model } from 'mongoose';

export type IReview = {
  reviewerId?: string;
  comment: string | null;
};

export type IBook = {
  addedBy: string;
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
  reviews: IReview[];
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  publicationYear?: number;
};
