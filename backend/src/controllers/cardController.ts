import { Request, Response } from "express";
import Card from "../models/Card";
import { Error } from "mongoose";

export const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
