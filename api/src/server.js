import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import connectDB from "./config/mongodb.config.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Parse the body of the request
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(PORT, async () => {
  console.log(`http://localhost:${PORT}`);
  await connectDB();
});
