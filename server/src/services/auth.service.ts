import DBClient from "../../prisma/DBClient";
import bcrypt from "bcryptjs";
import { UserAuthRequestDto, UserAuthResponseDto } from "../dto/user.auth.dto";
import { DuplicateEntityError, InternalServerError } from "../global/errors";

const createUser = async (
  userAuthRequestDto: UserAuthRequestDto
): Promise<UserAuthResponseDto> => {
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

export default { createUser };
