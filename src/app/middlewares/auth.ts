import { NextFunction, Request, Response } from 'express';
import APIError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelper } from '../../helpers/jwtHelper';
import config from '../../config';
import { Secret } from 'jsonwebtoken';
import { Cow } from '../modules/books/book.model';
import { ENUM_USER_ROLE } from '../../enums/enums';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new APIError(httpStatus.UNAUTHORIZED, 'Token not found');
      }
      let verifiedUser = null;
      verifiedUser = jwtHelper.verifyToken(token, config.jwt.secret as Secret);

      req.user = verifiedUser;

      //   console.log(verifiedUser._id)

      if (requiredRoles.length) {
        if (requiredRoles.includes(ENUM_USER_ROLE.SPECIFIC_ROLE)) {
          // console.log('hola')
          const cowId = req.params.id;
          const sellerId = verifiedUser._id;
          const cow = await Cow.findOne({ _id: cowId, seller: sellerId });
          if (!cow) {
            throw new APIError(
              httpStatus.FORBIDDEN,
              'You are not authorized to access this cow'
            );
          }
        }
        if (!requiredRoles.includes(verifiedUser.role)) {
          throw new APIError(
            httpStatus.UNAUTHORIZED,
            'You are not authorized to access this route'
          );
        }
      }

      //   const hasSpecificRole = requiredRoles.includes(
      //     ENUM_USER_ROLE.SPECIFIC_ROLE
      //   );

      //   if (hasSpecificRole) {
      //     // Retrieve the cow ID from the route parameter
      //     const cowId = req.params.id;

      //     // Retrieve the seller ID from the authenticated user
      //     const sellerId = verifiedUser._id;
      //     console.log(cowId,sellerId)

      //     // Check if the authenticated user is the seller of the cow
      //     const cow = await Cow.findOne({ _id: cowId, seller: sellerId });

      //     if (!cow) {
      //       throw new APIError(
      //         httpStatus.FORBIDDEN,
      //         'You are not authorized to access this cow'
      //       );
      //     }
      //   }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
