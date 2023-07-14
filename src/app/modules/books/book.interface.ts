import { Model } from 'mongoose';

type IReview = {
  reviewer: string;
  comment: string;
};

export type IBook = {
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
