import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { OperationResponseDto } from "../dto/common.dto";
import { UserAuthRequestDto } from "../dto/user.auth.dto";
import {
  DuplicateEntityError,
  EntityNotFoundError,
  InternalServerError,
} from "../global/errors";
import User from "../../models/user.model";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;

const createUser = async (
  userAuthRequestDto: UserAuthRequestDto
): Promise<OperationResponseDto> => {
  try {
    const oldUser = await User.findOne({ email: userAuthRequestDto.email });
    // check if email is already in use
    if (oldUser) {
      throw new DuplicateEntityError();
    }
    const newUser = await User.create(userAuthRequestDto);
    if (!newUser) {
      throw new InternalServerError();
    }
    return {
      success: true,
    };
  } catch (e) {
    return {
      success: false,
      message:
        e instanceof DuplicateEntityError
          ? "Email already in use"
          : "Server error",
    };
  }
};

const signInUser = async (
  userAuthRequestDto: UserAuthRequestDto
): Promise<{ accessToken: string; userId: string }> => {
  const { email, password } = userAuthRequestDto;
  const user = await User.findOne({ email });
  if (!user) {
    throw new EntityNotFoundError();
  }
  // compare password
  if (!(await bcrypt.compare(password, user.password))) {
    throw new EntityNotFoundError();
  }
  // generate access token
  const accessToken = jwt.sign(
    {
      userId: user._id.toString(),
    },
    JWT_SECRET_KEY,
    {
      expiresIn: 3600, // 1 hour
    }
  );
  return {
    accessToken,
    userId: user._id.toString(),
  };
};

export default { createUser, signInUser };
