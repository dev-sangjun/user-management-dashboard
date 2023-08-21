import { Router } from "express";
import userController from "../controllers/user.controller";

const userRoute = Router();
userRoute.get("/", userController.getUser);
userRoute.patch("/", userController.updateUser);

export default userRoute;
