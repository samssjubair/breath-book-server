import { Schema, model } from 'mongoose';
import { BookModel, IBook } from './book.interface';

const BookSchema = new Schema<IBook>(
  {
    addedBy: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      enum: ['fiction', 'non-fiction', 'comic', 'novel', 'other'],
      default: 'other',
    },
    publicationYear: {
      type: Number,
      required: true,
    },
    reviews: [
      {
        reviewer: {
          type: String
        },
        comment: {
          type: String
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Book = model<IBook, BookModel>('Book', BookSchema);
