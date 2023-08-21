import { UserStatus } from "../global/types";

// common
export interface OperationResponseDto {
  success: boolean;
  message?: string;
}

// auth
export interface UserAuthRequestDto {
  email: string;
  password: string;
}

export interface UserSignInResponseDto {
  userId: string;
}

// entry
export interface UserEntryRequestDto {
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: Date;
  status: UserStatus;
  address: string[];
  other: { [key: string]: string };
}
