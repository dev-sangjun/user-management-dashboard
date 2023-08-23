import { UseFormRegisterReturn, useForm } from "react-hook-form";
import { UserStatus } from "../../global/types";
import { isUserStatus } from "../../utils";

interface FormValues {
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: Date;
  status: UserStatus;
  address: string;
}

interface Registerers {
  firstName: UseFormRegisterReturn<"firstName">;
  middleName: UseFormRegisterReturn<"middleName">;
  lastName: UseFormRegisterReturn<"lastName">;
  birthDate: UseFormRegisterReturn<"birthDate">;
  status: UseFormRegisterReturn<"status">;
  address: UseFormRegisterReturn<"address">;
}

const useEntryForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<FormValues>();
  const registerers: Registerers = {
    firstName: register("firstName", {
      required: "First name is required.",
    }),
    middleName: register("middleName"),
    lastName: register("lastName", {
      required: "Last name is required.",
    }),
    birthDate: register("birthDate", {
      required: "Last name is required.",
    }),
    status: register("status", {
      required: "Status is required.",
      validate: value => isUserStatus(value),
    }),
    address: register("address", {
      required: "Address is required.",
    }),
  };
  return { registerers, handleSubmit, watch, errors, reset, isValid };
};

export default useEntryForm;
