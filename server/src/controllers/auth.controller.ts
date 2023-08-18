import { NextFunction, Request, Response } from "express";
import { authService } from "../services";
import { UserAuthRequestDto } from "../dto/user.auth.dto";

const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
  const userAuthRequestDto: UserAuthRequestDto = req.body;
  try {
    const userAuthResponseDto = await authService.createUser(
      userAuthRequestDto
    );
    return res.json(userAuthResponseDto);
  } catch (e) {
    return next(e);
  }
};

export default { signUpUser };
