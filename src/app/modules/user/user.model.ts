import { Schema, model } from 'mongoose';
import { IUser, IUserMethods, UserModel, UserName } from './user.interface';
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
    role: {
      type: String,
      enum: ['buyer', 'seller', 'admin'],
      required: true,
    },
    name: {
      type: new Schema<UserName>(
        {
          firstName: {
            type: String,
            required: true,
          },
          lastName: {
            type: String,
            required: true,
          },
        },
        {
          _id: false,
        }
      ),
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
    },
    income: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.isUserExist = async function (
  phoneNumber: string
): Promise<Pick<IUser, 'password' | 'role' | 'phoneNumber'> | null> {
  return await User.findOne({ phoneNumber }, { _id: 1, password: 1, role: 1 });
};

UserSchema.statics.isUserExistById = async function (
  _id: string
): Promise<Pick<IUser, 'password' | 'role' | 'phoneNumber'> | null> {
  return await User.findOne({ _id }, { _id: 1, password: 1, role: 1 });
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
