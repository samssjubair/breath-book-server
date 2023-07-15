import { Schema, model } from 'mongoose';
import { IUser, IUserMethods, UserModel } from './user.interface';
import config from '../../../config';
import bcrypt from 'bcrypt';

export const UserSchema = new Schema<
  IUser,
  Record<string, never>,
  IUserMethods
>(
  {
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    }
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<IUser, 'password' | 'email'> | null> {
  return await User.findOne({ email }, { _id: 1, password: 1 });
};

UserSchema.statics.isUserExistById = async function (
  _id: string
): Promise<Pick<IUser, 'password' |'email'> | null> {
  return await User.findOne({ _id }, { _id: 1, password: 1});
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});

export const User = model<IUser, UserModel>('User', UserSchema);
