import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/enums';
const router = express.Router();

router.get('/my-profile', UserController.getMyProfile);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser);

router.patch(
  '/my-profile',
  UserValidation.validateRequest(UserValidations.updateUserZodSchema),
  // auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateMyProfile
);
router.patch(
  '/:id',
  UserValidation.validateRequest(UserValidations.updateUserZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateUser
);

export const UserRouter = router;
