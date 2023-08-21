import { UserStatus } from "./types";

export interface IEntry {
  _id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  birthDate: Date;
  status: UserStatus;
  address: string[];
  other: { string: string | number };
}
