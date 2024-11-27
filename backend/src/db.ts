import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Design from "./models/Design";
import { designs } from "./mockDesigns";
import Card from "./models/Card";
import fs from "fs";
import mockCardsData from "./mockCardsData.json";

let mongoServer: MongoMemoryServer;

export const connectDB = async () => {
  fs.mkdirSync("./test-db", { recursive: true });
  mongoServer = await MongoMemoryServer.create({
    // save database in filesystem
    instance: {
      dbPath: "./test-db",
      dbName: "example",
      storageEngine: "wiredTiger",
    },
    dispose: {
      enabled: false,
      cleanup: {
        doCleanup: false,
      },
    },
  });
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
  console.log("Connected to in-memory MongoDB");

  try {
    // Prefill the database with mock designs
    await preloadDesigns();
    await preloadCards();
  } catch (error) {
    console.log("Mock data already inserted");
  }
};

const preloadDesigns = async () => {
  await Design.insertMany(designs);
  console.log("Mock designs inserted");
};

const preloadCards = async () => {
  await Card.insertMany(mockCardsData);
  console.log("Mock cards inserted");
};

process.on("SIGUSR2", async () => {
  console.log("Cleaning up mongo server");
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
  process.exit(0);
});
