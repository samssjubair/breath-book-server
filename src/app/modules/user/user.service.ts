/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import APIError from '../../../errors/ApiError';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
  IUser,
} from './user.interface';
import { User } from './user.model';
import config from '../../../config';
import { jwtHelper } from '../../../helpers/jwtHelper';
import { Secret } from 'jsonwebtoken';

const createUser = async (payload: Partial<IUser>): Promise<IUser | null> => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;
  // creating instance of User
  // const user = new User();
  //  // access to our instance methods
  //   const isUserExist = await user.isUserExist(id);

  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new APIError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new APIError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token

  const { _id } = isUserExist;
  const accessToken = jwtHelper.createToken(
    { _id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelper.createToken(
    { _id },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};



const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelper.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
    // console.log(verifiedToken)
  } catch (err) {
    throw new APIError(httpStatus.FORBIDDEN, 'Invalid Refresh token');
    // err
  }

  // checking deleted user's token
  const { _id } = verifiedToken;

  const isUserExist = await User.isUserExistById(_id);
  if (!isUserExist) {
    throw new APIError(httpStatus.NOT_FOUND, 'User not exist !');
  }

  // generate new token
  const newAccessToken = jwtHelper.createToken(
    {
      _id: isUserExist._id
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const UserService = {
  createUser,
  loginUser,
  refreshToken,
};
