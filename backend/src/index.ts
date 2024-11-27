import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { connectDB } from "./db";
import designRoutes from "./routes/design";
import cardRoutes from "./routes/card";
import userRoutes from "./routes/user";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use((req, res, next) => {
  // Fake user for testing
  if (req.cookies?.user) {
    req.user = req.cookies.user;
  }
  next();
});

app.use(json());

app.use("/designs", designRoutes);
app.use("/cards", cardRoutes);
app.use("/user", userRoutes);

connectDB().then(() => {
  app
    .listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
    .on("error", (err) => {
      console.error("Server error:", err);
    });
});
