import { Router } from "express";
import authRoute from "./auth.route";
import { authMiddleware } from "../middlewares/auth.middleware";
import userRoute from "./user.route";

const rootRoute = Router();
rootRoute.use("/auth", authRoute);
rootRoute.use("/me", authMiddleware, userRoute);

export default rootRoute;
