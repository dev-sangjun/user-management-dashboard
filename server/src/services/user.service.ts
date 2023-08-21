import User from "../../models/user.model";
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

export default { getUserById };
