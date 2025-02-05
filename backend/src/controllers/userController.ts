import { RequestHandler } from "express";
import User from "../models/User";

export const getCurrentUser: RequestHandler = async (req, res) => {
  // Just return all users so we can easily switch for debugging
  const allUsers = await User.find();
  let user;
  if (req.user) {
    user = await User.findById(req.user);
  }

  res.send({ user, allUsers });
};
