import axios, { AxiosResponse } from "axios";
import { SERVER_ENDPOINT } from "./constants";
import { CustomFields, IUser } from "../global/entity.types";
import { OperationResponseDto } from "./dto";

const fetchUser = async (): Promise<IUser> => {
  const res: AxiosResponse<IUser> = await axios.get(`${SERVER_ENDPOINT}/me`, {
    withCredentials: true,
  });
  return res.data;
};

const updateCustomFields = async (
  customFields?: CustomFields
): Promise<OperationResponseDto> => {
  const res: AxiosResponse<OperationResponseDto> = await axios.patch(
    `${SERVER_ENDPOINT}/me`,
    {
      customFields: { ...customFields },
    },
    {
      withCredentials: true,
    }
  );
  return res.data;
};

const userAPI = {
  fetchUser,
  updateCustomFields,
};

export default userAPI;
