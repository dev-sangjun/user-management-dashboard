import { useEffect } from "react";
import { UseFormRegisterReturn, useForm } from "react-hook-form";

export interface FormValues {
  username: string;
  email: string;
  password: string;
}

interface Registerers {
  username?: UseFormRegisterReturn<"username">;
  email: UseFormRegisterReturn<"email">;
  password: UseFormRegisterReturn<"password">;
}

const useUserForm = (isSignIn: boolean) => {
  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<FormValues>();
  useEffect(() => {
    unregister();
  }, [isSignIn, unregister]);
  const registerers: Registerers = {
    email: register("email", { required: "Email is required." }),
    password: register("password", {
      required: "Password is required.",
      minLength: isSignIn
        ? { value: 0, message: "" }
        : {
            value: 8,
            message: "Password must have at least 8 characters.",
          },
    }),
  };
  return {
    registerers,
    handleSubmit,
    errors,
    clearErrors,
  };
};

export default useUserForm;
