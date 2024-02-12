import React, { useState } from "react";
import axiosClientAuth from "../serviceApi/http-common";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../schema/signupSchema";
import { useNavigate } from "react-router-dom";
import CustomButton from "../elements/CustomButton";
import OutletMainLayout from "../elements/OutletMainLayout";
import OutletPrimaryTab from "../elements/OutletPrimaryTab";
import Spinner from "../components/Spinner";
import CustomTitle from "../elements/CustomTitle";
import CustomLabel from "../elements/CustomLabel";
import CustomInputBox from "../elements/CustomInputBox";
import CustomInput from "../elements/CustomInput";
import Divide from "../elements/Divide";
import CustomButtonGoogle from "../elements/CustomButtonGoogle";
import Error from "../messageAndError/Error";
import SuccessMailSent from "../messageAndError/SuccessMailSent";

function Signup() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const goToLogin = () => navigate("/login");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data) => {
    try {
      // qui da mettere indirizzo vero quando in PROD questo in DEV ************
      setIsLoading(true);
      const response = await axiosClientAuth.post(
        `${import.meta.env.VITE_APP_BASE_URL}/users/signup`,
        data
      );

      setMessage({
        type: "success",
        text: "Check your email to ACTIVATE your account",
      });
      // reset();
    } catch (error) {
      if (error.response) {
        // La richiesta è stata fatta e il server ha risposto con uno stato diverso da 2xx
        setMessage({ type: "error", text: error.response.data.message });
      } else if (error.request) {
        // La richiesta è stata fatta ma non è stata ricevuta alcuna risposta
        setMessage({ type: "error", text: "No response from the server." });
      } else {
        // Qualcos'altro ha causato l'errore
        setMessage({ type: "error", text: "Something went wrong." });
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleGoogleLogin = async () => {
    if (import.meta.env.MODE === "production") {
      setMessage({
        type: "error",
        text: "This feature is only available in local/development mode.",
      });

      return;
    }

    try {
      setIsLoading(true);

      // Effettua una richiesta al tuo backend per avviare il processo di autenticazione con Google
      const response = await axiosClientAuth.get(
        `${import.meta.env.VITE_APP_BASE_URL}/users/requestUrlOgoogle`
      );
      // Reindirizza l'utente alla pagina di autenticazione di Google
      window.location.href = response.data.url;
    } catch (error) {
      if (error.response) {
        // La richiesta è stata fatta e il server ha risposto con uno stato diverso da 2xx
        setMessage({ type: "error", text: error.response.data.message });
      } else if (error.request) {
        // La richiesta è stata fatta ma non è stata ricevuta alcuna risposta
        setMessage({ type: "error", text: "No response from the server." });
      } else {
        // Qualcos'altro ha causato l'errore
        setMessage({ type: "error", text: "Something went wrong." });
      }
    } finally {
      setIsLoading(false);
    }
  };
  const onResetHandler = () => {
    clearErrors();
    setMessage(null);
    setTimeout(() => {
      reset({
        userName: "",
        email: "",
        password: "",
        passwordConfirm: "",
      });
    }, 5);
  };
  return (
    <OutletMainLayout>
      <div className=" w-[90%] md:w-[50%] flex justify-center self-center mt-12 mb-24 ">
        <OutletPrimaryTab>
          <CustomTitle>SignUp</CustomTitle>
          <form
            className="max-w-[90%]"
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <div>
              <CustomLabel>Name</CustomLabel>
              <CustomInputBox>
                <CustomInput
                  type="text"
                  {...register("userName")}
                  name="userName"
                />
                <div>{errors.userName?.message}</div>
              </CustomInputBox>
            </div>
            <div className="mt-4">
              <CustomLabel>Email</CustomLabel>
              <CustomInputBox>
                <CustomInput type="text" {...register("email")} name="email" />
                <div>{errors.email?.message}</div>
              </CustomInputBox>
            </div>
            <div className="mt-4">
              <CustomLabel>Password</CustomLabel>
              <CustomInputBox>
                <CustomInput
                  type="password"
                  {...register("password")}
                  name="password"
                />
              </CustomInputBox>
              <div>{errors.password?.message}</div>
            </div>
            <div className="mt-4">
              <CustomLabel>Confirm Password</CustomLabel>
              <CustomInputBox>
                <CustomInput
                  name="passwordConfirm"
                  type="password"
                  {...register("passwordConfirm")}
                />
                <div>{errors.passwordConfirm?.message}</div>
              </CustomInputBox>
            </div>
            <div className="flex items-center justify-center m-6 gap-2">
              <CustomButton
                type="submit"
                onClick={handleSubmit(onSubmitHandler)}
              >
                <p>Register</p>
              </CustomButton>
              <CustomButton onClick={onResetHandler}>Reset</CustomButton>
            </div>
          </form>
          <div className="flex justify-center m-6 ">
            <CustomButton onClick={goToLogin}>
              Already have an account?
            </CustomButton>
          </div>
          <Divide>OR</Divide>

          <CustomButtonGoogle
            handleGoogleLogin={handleGoogleLogin}
          ></CustomButtonGoogle>

          {isLoading && <Spinner />}
          {message?.type === "error" && !isLoading && (
            <div className="flex flex-col justify-center items-center">
              <Error message={message.text} />
              <CustomButton
                className=""
                onClick={onResetHandler}
                disabled={isLoading}
              >
                <p>RESET</p>
              </CustomButton>
            </div>
          )}
          {message?.type === "success" && !isLoading && (
            <div className="flex flex-col justify-center items-center">
              <SuccessMailSent message={message.text} />
              <CustomButton className="" onClick={goToLogin}>
                <p>Login</p>
              </CustomButton>
            </div>
          )}
        </OutletPrimaryTab>
      </div>
    </OutletMainLayout>
  );
}

export default Signup;
