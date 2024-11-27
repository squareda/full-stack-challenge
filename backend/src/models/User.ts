import { Schema, Document, model } from "mongoose";

export interface IUser {
  name: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema = new Schema<IUserModel>(
  {
    name: { type: String },
  },
  { timestamps: true }
);

const User = model<IUserModel>("User", UserSchema);

export default User;
