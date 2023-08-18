import DBClient from "../../prisma/DBClient";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OperationResponseDto } from "../dto/common.dto";
import { UserAuthRequestDto } from "../dto/user.auth.dto";
import {
  DuplicateEntityError,
  EntityNotFoundError,
  InternalServerError,
} from "../global/errors";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;
const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY!;

const createUser = async (
  userAuthRequestDto: UserAuthRequestDto
): Promise<OperationResponseDto> => {
  const { email, password } = userAuthRequestDto;

  // check if email is already used
  try {
    const user = await DBClient.user.findFirst({
      where: {
        email,
      },
    });
    if (user) {
      throw new DuplicateEntityError();
    }
  } catch (e) {
    if (e instanceof DuplicateEntityError) {
      return {
        success: false,
        message: "Email is already in use.",
      };
    }
    throw e;
  }

  // hash password & create user
  const salt = await bcrypt.genSalt(); // generate salt to add before hashing
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    await DBClient.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    return {
      success: true,
    };
  } catch (e) {
    throw new InternalServerError();
  }
};

const signInUser = async (
  userAuthRequestDto: UserAuthRequestDto
): Promise<{ accessToken: string; userId: string }> => {
  const { email, password } = userAuthRequestDto;
  const user = await DBClient.user.findFirst({
    where: {
      email,
    },
  });
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
      userId: user.id,
    },
    JWT_SECRET_KEY,
    {
      expiresIn: 3600, // 1 hour
    }
  );
  return {
    accessToken,
    userId: user.id,
  };
};

export default { createUser, signInUser };
