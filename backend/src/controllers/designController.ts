import { RequestHandler } from "express";
import Design from "../models/Design";

export const getDesigns: RequestHandler = async (req, res) => {
  const designs = await Design.find();

  res.send(designs);
};
