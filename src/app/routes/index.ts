import express from 'express';
import { authRouter } from '../modules/user/auth.route';
import { BooksRouter } from '../modules/books/book.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    router: authRouter,
  },
  {
    path: '/books',
    router: BooksRouter,
  }
];

moduleRoutes.forEach(route => {
  router.use(route.path, route.router);
});

export default router;
