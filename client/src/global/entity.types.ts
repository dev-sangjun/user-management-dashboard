import { UserStatus } from "./types";

export type CustomFields = { string: string | number };

export interface IUser {
  id: string;
  customFields?: CustomFields;
}

export interface IEntry {
  _id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  birthDate: Date;
  status: UserStatus;
  address: string[];
  other: CustomFields;
}
