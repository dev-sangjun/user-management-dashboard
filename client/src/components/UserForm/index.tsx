import { useState } from "react";
import useUserForm from "./useUserForm";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import {
  renderAlertErrorMessages,
  renderFieldErrorMessages,
} from "./error.utils";
import authAPI from "../../api/auth.api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { asyncFetchUser } from "../../store/user.reducer";

const getUserFormTexts = (isSignIn: boolean) => ({
  mode: isSignIn ? "Sign in" : "Sign up",
  switchMode: isSignIn ? "Sign up" : "Sign in",
  transition: isSignIn ? "Don't have an account?" : "Already have an account?",
});

const UserForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSignIn, setIsSignIn] = useState(true);
  const { registerers, handleSubmit, errors, clearErrors } =
    useUserForm(isSignIn);
  const [alertErrorMessages, setAlertErrorMessages] = useState<string[]>([]);
  const userFormTexts = getUserFormTexts(isSignIn);
  const renderInput = (
    type: "email" | "password",
    label: string,
    register?: UseFormRegisterReturn,
    fieldError?: FieldError
  ) => {
    return (
      <>
        <label className="label text-sm">{label}</label>
        <input
          className="input input-sm input-bordered w-full text-[16px]"
          type={type}
          placeholder={label}
          autoComplete={isSignIn ? "on" : "off"}
          {...register}
        />
        {renderFieldErrorMessages(fieldError)}
      </>
    );
  };
  const onSubmit = handleSubmit(async data => {
    if (isSignIn) {
      try {
        await authAPI.signIn(data);
        dispatch(asyncFetchUser());
      } catch (e) {
        setAlertErrorMessages([]);
      }
    } else {
      try {
        await authAPI.signUp(data);
        dispatch(asyncFetchUser());
      } catch (e) {
        setAlertErrorMessages([]);
      }
    }
  });
  return (
    <div className="card gap-2 bg-slate-100 p-8 md:p-12 w-full max-w-lg">
      <div className="flex flex-col items-center gap-4 md:gap-6">
        <h1 className="logo-text text-3xl md:text-4xl">Finni Health</h1>
        <div className="w-full flex justify-between items-center">
          <h2 className="md:text-xl font-bold">{userFormTexts.mode}</h2>
        </div>
      </div>
      {renderAlertErrorMessages(alertErrorMessages)}
      <form onSubmit={onSubmit}>
        {renderInput("email", "Email", registerers.email, errors.email)}
        {renderInput(
          "password",
          "Password",
          registerers.password,
          errors.password
        )}
        <button
          className="btn btn-primary btn-sm normal-case w-full mt-4"
          type="submit"
        >
          {userFormTexts.mode}
        </button>
      </form>
      <div className="flex justify-center items-center w-full gap-4 text-sm md:text-md">
        <span>{userFormTexts.transition}</span>
        <button
          className="btn btn-link btn-sm normal-case gap-2 text-primary p-0 no-underline hover:no-underline"
          onClick={() => {
            clearErrors();
            setIsSignIn(prev => !prev);
          }}
        >
          {userFormTexts.switchMode}
        </button>
      </div>
    </div>
  );
};

export default UserForm;
