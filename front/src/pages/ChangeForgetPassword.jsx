import React, { useState } from "react";
import axiosClientAuth from "../serviceApi/http-common";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../schema/forgetPassSchema";
import { useNavigate, useParams } from "react-router-dom";
import OutletMainLayout from "../elements/OutletMainLayout";
import OutletPrimaryTab from "../elements/OutletPrimaryTab";
import CustomTitle from "../elements/CustomTitle";
import CustomLabel from "../elements/CustomLabel";
import CustomInput from "../elements/CustomInput";
import CustomInputBox from "../elements/CustomInputBox";
import CustomButton from "../elements/CustomButton";
import Spinner from "../components/Spinner";
import Error from "../messageAndError/Error";
import SuccessConfirm from "../messageAndError/SuccessConfirm";

function ChangeForgetPassword() {
  const { token: tokenMail } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleChangePassword = async (data) => {
    try {
      setIsLoading(true);
      const response = await axiosClientAuth.patch(
        `/users/resetPassword/${tokenMail}`,
        {
          password: data.password,
          passwordConfirm: data.confirmPassword,
        }
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMessage({ type: "success", text: "Password changed successfully." });
    } catch (error) {
      console.error("Error during password change:", error);

      if (error.response && error.response.status === 400) {
        // Token scaduto o invalido
        setMessage({
          type: "error",
          text: "The reset password link is expired or invalid. Please request a new one.",
        });
      } else if (error.response) {
        setMessage({ type: "error", text: error.response.data.message });
      } else {
        setMessage({ type: "error", text: "Something went wrong." });
      }
    } finally {
      setIsLoading(false);
    }
  };
  const onResetHandler = () => {
    setMessage(null);
    clearErrors();
    setTimeout(() => {
      reset({
        password: "",
        passwordConfirm: "",
      });
    }, 5);
    reset();
  };
  return (
    <OutletMainLayout>
      <OutletPrimaryTab>
        <CustomTitle>Change Password</CustomTitle>
        <form onSubmit={handleSubmit(handleChangePassword)}>
          <div className="mb-4">
            <CustomLabel htmlFor="password">New Password:</CustomLabel>
            <CustomInputBox>
              <CustomInput
                type="password"
                id="password"
                {...register("password")}
                required
              />
            </CustomInputBox>
            <div className="">{errors.password?.message}</div>
          </div>
          <div className="mb-4">
            <CustomLabel htmlFor="confirmPassword">
              Confirm Password:
            </CustomLabel>
            <CustomInputBox>
              <CustomInput
                type="password"
                id="confirmPassword"
                {...register("confirmPassword")}
                required
              />
            </CustomInputBox>
            <div className="">{errors.confirmPassword?.message}</div>
          </div>
          <CustomButton type="submit" disabled={isLoading}>
            Change Password
          </CustomButton>
        </form>
        {isLoading && <Spinner />}
        {message?.type === "error" && !isLoading && (
          <div className="flex flex-col justify-center items-center">
            <Error message={message.text} />
            <CustomButton className="" onClick={onResetHandler}>
              <p>RESET</p>
            </CustomButton>
          </div>
        )}
        {message?.type === "success" && !isLoading && (
          <div className="flex flex-col justify-center items-center">
            <SuccessConfirm message={message.text} />
            <CustomButton className="" onClick={goToLogin}>
              <p>RESET</p>
            </CustomButton>
          </div>
        )}
      </OutletPrimaryTab>
    </OutletMainLayout>
  );
}

export default ChangeForgetPassword;
