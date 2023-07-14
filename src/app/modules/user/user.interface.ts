import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  _id: string;
  password: string;
  role: 'buyer' | 'seller' | 'admin';
  name: UserName;
  phoneNumber: string;
  budget?: number;
  income?: number;
  address: string;
};

export type IUserMethods = {
  isUserExist(id: string): Promise<Partial<IUser | null>>;
  isUserExistById(id: string): Promise<Partial<IUser | null>>;
  isPasswordMatched(givenPass: string, savedPass: string): Promise<boolean>;
};

export type UserModel = {
  isUserExist(
    phoneNumber: string
  ): Promise<Pick<IUser, 'password' | 'role' | '_id'>>;
  isUserExistById(
    _id: string
  ): Promise<Pick<IUser, 'password' | 'role' | '_id'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

// export type UserModel = Model<IUser, Record<string, unknown>>;

export type IUserFilters = {
  searchTerm?: string;
  phoneNumber?: string;
  budget?: number;
};

export type ILoginUser = {
  phoneNumber: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
