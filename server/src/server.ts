import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rootRoute from "./routes";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api", rootRoute);
app.listen(PORT, () => console.log(`Server running at ${PORT}`));
