export const INPUT_CLASSES = "input input-sm input-bordered w-full text-[16px]";
export const ADDITIONAL_INPUT_NAME_PREFIX = "additional";
export const USER_STATUS = ["Inquiry", "Onboarding", "Active", "Churned"];
export const BASE_CONTAINER_CLASSES =
  "flex justify-center h-screen max-w-[1440px] mx-auto bg-base-100 md:min-w-[1080px]";

export const USER_ENTRY_FIELD_NAMES: { [key: string]: string } = {
  _id: "User ID",
  firstName: "First Name",
  middleName: "Middle Name",
  lastName: "Last Name",
  birthDate: "Birth Date",
  status: "Status",
  address: "Address",
};

export const USER_ENTRY_DEFAULT_KEYS = Object.keys(
  USER_ENTRY_FIELD_NAMES
).filter(key => key !== "_id");

export const USER_ENTRY_DEFAULT_FIELDS = Object.keys(USER_ENTRY_FIELD_NAMES)
  .filter(key => key !== "_id")
  .map(key => USER_ENTRY_FIELD_NAMES[key]);
