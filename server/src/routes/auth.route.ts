import { Router } from "express";
import { authController } from "../controllers";

const authRoute = Router();
authRoute.post("/signup", authController.signUpUser);
authRoute.post("/signin", authController.signInUser);

export default authRoute;
