import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import rootRoute from "./routes";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
const corsOptions = {
  credentials: true,
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api", rootRoute);
mongoose.connect(process.env.DATABASE_URL!).then(() => {
  app.listen(PORT, () => console.log(`Server running at ${PORT}`));
})
