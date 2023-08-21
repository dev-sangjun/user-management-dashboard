import moment from "moment";

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
