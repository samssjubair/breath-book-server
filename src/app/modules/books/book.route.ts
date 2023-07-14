import express from 'express';
import { BookController } from './book.controller';
import { UserValidation } from '../../middlewares/validateRequest';
import { BookValidation } from './book.validation';
// import auth from '../../middlewares/auth';
// import { ENUM_USER_ROLE } from '../../../enums/enums';

const router = express.Router();

router.post(
  '/reviews/:id',
  UserValidation.validateRequest(BookValidation.addReviewSchema),
  BookController.addReview
);

router.get(
  '/:id',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  BookController.getSingleBook
);
router.get(
  '/',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  BookController.getAllBooks
);

router.post(
  '/',
  UserValidation.validateRequest(BookValidation.createBookSchema),
  // auth(ENUM_USER_ROLE.SELLER),
  BookController.createBook
);

router.delete(
  '/:id',
  // auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.SPECIFIC_ROLE),
  BookController.deleteBook
);

router.patch(
  '/:id',
  UserValidation.validateRequest(BookValidation.updateBookSchema),
  // auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.SPECIFIC_ROLE),
  BookController.updateBook
);

export const BooksRouter = router;
