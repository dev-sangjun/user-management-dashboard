import User, { IUser } from "../../models/user.model";
import { OperationResponseDto } from "../dto/common.dto";
import { EntityNotFoundError } from "../global/errors";

const getUserById = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new EntityNotFoundError();
  }
  return {
    id: user._id,
    customFields: user.customFields,
  };
};

const updateUserById = async (
  userId: string,
  data: IUser
): Promise<OperationResponseDto> => {
  const user = await User.findByIdAndUpdate(userId, data);
  console.log(data);
  if (!user) {
    throw new EntityNotFoundError();
  }
  return {
    success: true,
  };
};

export default { getUserById, updateUserById };
