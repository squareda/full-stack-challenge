import { RequestHandler } from "express";
import Card from "../models/Card";

export const getCards: RequestHandler = async (req, res) => {
  const cards = await Card.find();
  res.send(cards);
};
