import axiosClientAuth from "../serviceApi/http-common";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../schema/loginSchema";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMain } from "../contexts/MainContext";
import Error from "../messageAndError/Error";
import OutletMainLayout from "../elements/OutletMainLayout";
import OutletPrimaryTab from "../elements/OutletPrimaryTab";
import Spinner from "../components/Spinner";
import CustomButton from "../elements/CustomButton";
import CustomButtonGoogle from "../elements/CustomButtonGoogle";
import CustomInput from "../elements/CustomInput";
import CustomLabel from "../elements/CustomLabel";
import CustomInputBox from "../elements/CustomInputBox";
import Divide from "../elements/Divide";
import CustomTitle from "../elements/CustomTitle";

function Login() {
  console.log("env", import.meta.env.VITE_APP_BASE_URL);
  const { dispatch } = useMain();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const goToForgetPassword = () => navigate("/forgetPassword");

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
      setIsLoading(true);
      const response = await axiosClientAuth.post(
        `${import.meta.env.VITE_APP_BASE_URL}/users/login`,
        data
      );

      const { token } = response.data;
      const user = response.data.data.user;
      Cookies.set("jwt", token, { secure: true, sameSite: "strict" });
      console.log(token, "jwt");
      dispatch({
        type: "main/user/setUser",
        payload: user,
      });
      window.location.reload();
    } catch (error) {
      if (error.response) {
        // La richiesta è stata fatta e il server ha risposto con uno stato diverso da 2xx
        setMessage({ type: "error", text: error.response.data.message });
      } else if (error.request) {
        // La richiesta è stata fatta ma non è stata ricevuta alcuna risposta
        console.error("Error request:", error.request);
        setMessage({ type: "error", text: "No response from the server." });
      } else {
        // Qualcos'altro ha causato l'errore
        console.error("Error message:", error.message);
        setMessage({ type: "error", text: "Something went wrong." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (import.meta.env.MODE === "production") {
      setMessage({
        type: "info",
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
    setMessage(null);
    clearErrors();
    setTimeout(() => {
      reset({
        email: "",
        password: "",
      });
    }, 5);
  };
  return (
    <OutletMainLayout>
      <div className=" w-[90%] md:w-[50%] flex justify-center self-center mt-12 mb-24 ">
        <OutletPrimaryTab>
          <CustomTitle>Login</CustomTitle>

          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="max-w-[90%]"
          >
            {/* //EMAIL */}
            <div className="mt-4">
              <CustomLabel>Email</CustomLabel>
              <CustomInputBox>
                <CustomInput type="text" {...register("email")} name="email" />
                <div className="">{errors.email?.message}</div>
              </CustomInputBox>
            </div>
            {/* //PASSWORD*/}
            <div className="mt-4">
              <CustomLabel>Password</CustomLabel>
              <CustomInputBox className="flex flex-col items-start">
                <CustomInput
                  type="password"
                  {...register("password")}
                  name="password"
                />
              </CustomInputBox>
              <div className="">{errors.password?.message}</div>
            </div>

            {/* //BUTTONS */}
            <div className="flex justify-center items-center gap-4">
              {/* //Forget Password */}
              <div className="flex items-center justify-center my-6">
                <CustomButton onClick={goToForgetPassword}>
                  Forget Password?
                </CustomButton>
              </div>
              {/* //LOGIN*/}
              <div className="flex items-center justify-center">
                <CustomButton
                  type="submit"
                  onClick={handleSubmit(onSubmitHandler)}
                >
                  <p>Login</p>
                </CustomButton>
              </div>
            </div>
            <Divide></Divide>
            <CustomButtonGoogle
              handleGoogleLogin={handleGoogleLogin}
            ></CustomButtonGoogle>
          </form>
          {isLoading && <Spinner />}
          {message && !isLoading && (
            <div className="flex flex-col justify-center items-center">
              <Error message={message.text} />
              <CustomButton onClick={onResetHandler}>
                <p>RESET</p>
              </CustomButton>
            </div>
          )}
        </OutletPrimaryTab>
      </div>
    </OutletMainLayout>
  );
}

export default Login;
