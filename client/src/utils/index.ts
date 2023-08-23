import moment from "moment";
import { USER_STATUS } from "../global/constants";
export const formatValue = (key: string, value: string | string[]) => {
  if (key === "birthDate") {
    return moment(value).format("MM/DD/YYYY");
  }
  if (value instanceof Array) {
    return value.join("\n");
  }
  if (!value) {
    return "N/A";
  }
  return value;
};

export const isUserStatus = (status: string) => USER_STATUS.includes(status);
