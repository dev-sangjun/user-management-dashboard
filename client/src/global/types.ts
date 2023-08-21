export type UserStatus = "Inquiry" | "Onboarding" | "Active" | "Churned";
export const USER_STATUS = ["Inquiry", "Onboarding", "Active", "Churned"];
export const isUserStatus = (status: string) => USER_STATUS.includes(status);
