import { Router } from "express";
import authRoute from "./auth.route";
import entryRoute from "./entry.route";
import userRoute from "./user.route";
import { authMiddleware } from "../middlewares/auth.middleware";

const rootRoute = Router();
rootRoute.use("/auth", authRoute);
rootRoute.use("/entries", authMiddleware, entryRoute);
rootRoute.use("/me", authMiddleware, userRoute);

export default rootRoute;
