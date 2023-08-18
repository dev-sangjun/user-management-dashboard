export interface UserAuthRequestDto {
  email: string;
  password: string;
}

export interface UserAuthResponseDto {
  success: boolean;
  message?: string;
}
