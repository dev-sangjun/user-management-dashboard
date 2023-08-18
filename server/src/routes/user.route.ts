import { Router } from "express";
import { AuthorizedRequest } from "../middlewares/auth.middleware";

const userRoute = Router();
userRoute.get("/", (req, res) => {
  const { authorizedUserId } = req as AuthorizedRequest;
  return res.json({
    id: authorizedUserId
  })
});


export default userRoute;
