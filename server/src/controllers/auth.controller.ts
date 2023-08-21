import { NextFunction, Request, Response } from "express";
import { authService } from "../services";
import { UserAuthRequestDto } from "../dto/user.auth.dto";

const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
  const userAuthRequestDto: UserAuthRequestDto = req.body;
  try {
    const operationResponseDto = await authService.createUser(
      userAuthRequestDto
    );
    return res.json(operationResponseDto);
  } catch (e) {
    return next(e);
  }
};

const signInUser = async (req: Request, res: Response, next: NextFunction) => {
  const userAuthRequestDto: UserAuthRequestDto = req.body;
  try {
    const { accessToken, userId } = await authService.signInUser(
      userAuthRequestDto
    );
    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true, // disable access from external scripts
        sameSite: true,
      })
      .json({ userId });
  } catch (e) {
    return next(e);
  }
};

export default { signUpUser, signInUser };
