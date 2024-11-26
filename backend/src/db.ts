import mongoose, { Schema, CompileModelOptions } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server-core";
import Design from "./models/Design";
import { designs } from "./mockDesigns";
import Card from "./models/Card";
import fs from "fs";
import mockCardsData from "./mockCardsData.json";

export const connectDB = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
  console.log("Connected to in-memory MongoDB");

  // Prefill the database with mock designs
  await preloadDesigns();
  await preloadCards();
};

const preloadDesigns = async () => {
  await Design.insertMany(designs);
  console.log("Mock designs inserted");
};

const preloadCards = async () => {
  await Card.insertMany(mockCardsData);
  console.log("Mock cards inserted");
};
