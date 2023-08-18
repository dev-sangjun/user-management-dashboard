import { Router } from "express";
import { authController } from "../controllers";

const authRoute = Router();
authRoute.post("/signup", authController.signUpUser);

export default authRoute;
