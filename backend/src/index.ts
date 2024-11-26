import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { connectDB } from "./db";
import designRoutes from "./routes/design";
import cardRoutes from "./routes/card";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(json());

app.use("/designs", designRoutes);
app.use("/cards", cardRoutes);

connectDB().then(() => {
  app
    .listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
    .on("error", (err) => {
      console.error("Server error:", err);
    });
});
