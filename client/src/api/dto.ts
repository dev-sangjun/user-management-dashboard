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
