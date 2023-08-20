import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as core from "express-serve-static-core";

export interface AuthorizedRequest<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  authorizedUserId: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.accessToken;
  if (!token) return res.sendStatus(403); // forbidden
  try {
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;
    const payload = jwt.verify(token, JWT_SECRET_KEY) as { userId: string };
    console.log("payload", payload);
    (req as AuthorizedRequest).authorizedUserId = payload.userId;
    next();
  } catch (e) {
    console.error(e);
    return res.sendStatus(401); // unauthorized
  }
};
