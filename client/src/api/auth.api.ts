import axios, { AxiosResponse } from "axios";
import {
  OperationResponseDto,
  UserAuthRequestDto,
  UserSignInResponseDto,
} from "./dto";
import { SERVER_ENDPOINT } from "./constants";

const signIn = async (
  dto: UserAuthRequestDto,
): Promise<UserSignInResponseDto | OperationResponseDto> => {
  const res: AxiosResponse<UserSignInResponseDto | OperationResponseDto> =
    await axios.post(`${SERVER_ENDPOINT}/auth/signin`, dto, {
      withCredentials: true,
    });
  // returns userId on successful sign in
  return res.data;
};

const signUp = async (
  dto: UserAuthRequestDto,
): Promise<OperationResponseDto> => {
  const res: AxiosResponse<OperationResponseDto> = await axios.post(
    `${SERVER_ENDPOINT}/auth/signup`,
    dto,
  );
  return res.data;
};

const authAPI = {
  signIn,
  signUp,
};

export default authAPI;
