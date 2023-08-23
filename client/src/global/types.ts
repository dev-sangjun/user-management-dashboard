export type UserStatus = "Inquiry" | "Onboarding" | "Active" | "Churned";
export const USER_STATUS = ["Inquiry", "Onboarding", "Active", "Churned"];
export const isUserStatus = (status: string) => USER_STATUS.includes(status);
export type QueryType = {
  page?: string;
  limit?: string;
  field?: string;
  value?: string;
};
