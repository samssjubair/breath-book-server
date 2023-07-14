import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import {
  IGenericResponse,
  IPaginationOptions,
} from '../../../interfaces/common';
import { bookSearchableFields } from './book.constant';
import { IBook, IBookFilters } from './book.interface';
import { Book } from './book.model';

const createBook = async (payload: IBook): Promise<IBook | null> => {
  const bookData = await Book.create(payload);
  return bookData;
};

const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  const { 
    // genre , publicationYear,
     searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePaginations(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // if (genre && publicationYear) {
  //   andConditions.push({
  //     price: {
  //       $gte: minPrice,
  //       $lte: maxPrice,
  //     },
  //   });
  // } else if (minPrice) {
  //   andConditions.push({
  //     price: {
  //       $gte: minPrice,
  //     },
  //   });
  // } else if (maxPrice) {
  //   andConditions.push({
  //     price: {
  //       $lte: maxPrice,
  //     },
  //   });
  // }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Book.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id);
  return result;
};

const deleteBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findByIdAndDelete(id);
  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const updatedBook = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return updatedBook;
};

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  deleteBook,
  updateBook,
};