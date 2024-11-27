import { RequestHandler } from "express";
import User from "../models/User";
import APIError, { statusCodes } from "../utils/APIError";

export const getCurrentUser: RequestHandler = async (req, res) => {
  // Just return all users so we can easily switch for debugging
  const allUsers = await User.find();
  let user;
  if (req.user) {
    user = await User.findById(req.user);

    if (!user) {
      throw new APIError(statusCodes.NOT_FOUND, "User not found", true);
    }
  }

  res.send({ user, allUsers });
};
