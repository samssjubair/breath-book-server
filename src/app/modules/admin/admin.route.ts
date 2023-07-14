import express from 'express';
import { UserValidation } from '../../middlewares/validateRequest';
import { UserController } from '../user/user.controller';
import { UserValidations } from '../user/user.validation';

const router = express.Router();

router.post(
  '/create-admin',
  UserValidation.validateRequest(UserValidations.createUserSchema),
  UserController.createUser
);

router.post(
  '/login',
  UserValidation.validateRequest(UserValidations.loginSchema),
  UserController.loginUser
);

export const adminRouter = router;
