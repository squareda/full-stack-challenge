import { Request, Response } from "express";
import Design from "../models/Design";
import { Error } from "mongoose";

export const getDesigns = async (req: Request, res: Response) => {
  try {
    const designs = await Design.find();
    res.status(200).json(designs);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
