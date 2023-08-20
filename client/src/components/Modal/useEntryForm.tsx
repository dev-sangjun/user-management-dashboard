import { UseFormRegisterReturn, useForm } from "react-hook-form";
import { UserStatus } from "../../global/types";
import entryAPI from "../../api/entry.api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { closeModal } from "../../store/modal.reducer";

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
  const dispatch = useDispatch<AppDispatch>();
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
    middleName: register("middleName", {
      required: "Middle name is required.",
    }),
    lastName: register("lastName", {
      required: "Last name is required.",
    }),
    birthDate: register("birthDate", {
      required: "Last name is required.",
    }),
    status: register("status", {
      required: "Status is required.",
    }),
    address: register("address", {
      required: "Address is required.",
    }),
  };
  const onSubmit = handleSubmit(async data => {
    try {
      await entryAPI.addEntry(data);
      dispatch(closeModal());
    } catch (e) {
      console.error(e);
    }
  });
  return { registerers, onSubmit, watch, errors, reset, isValid };
};

export default useEntryForm;