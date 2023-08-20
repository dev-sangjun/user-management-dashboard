import { UserStatus } from "../global/types";

export interface UserEntryRequestDto {
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: Date;
  status: UserStatus;
  address: string[];
  other: {};
}
