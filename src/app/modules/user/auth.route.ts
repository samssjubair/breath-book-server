import express from 'express';
import { UserValidations } from './user.validation';
import { UserValidation } from '../../middlewares/validateRequest';
import { UserController } from './user.controller';

const router = express.Router();

router.post(
  '/login',
  UserValidation.validateRequest(UserValidations.loginSchema),
  UserController.loginUser
);

router.post(
  '/signup',
  UserValidation.validateRequest(UserValidations.createUserSchema),
  UserController.createUser
);

router.post(
  '/refresh-token',
  UserValidation.validateRequest(UserValidations.refreshTokenZodSchema),
  UserController.refreshToken
);

export const authRouter = router;
