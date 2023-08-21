import { NextFunction, Request, Response } from "express";
import { AuthorizedRequest } from "../middlewares/auth.middleware";
import userService from "../services/user.service";

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const { authorizedUserId } = req as AuthorizedRequest;
  try {
    const { id, customFields } = await userService.getUserById(
      authorizedUserId
    );
    return res.json({ id, customFields });
  } catch (e) {
    return next(e);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { authorizedUserId } = req as AuthorizedRequest;
  try {
    const { success, message } = await userService.updateUserById(
      authorizedUserId,
      req.body
    );
    return res.json({ success, message });
  } catch (e) {
    return next(e);
  }
};

export default { getUser, updateUser };
