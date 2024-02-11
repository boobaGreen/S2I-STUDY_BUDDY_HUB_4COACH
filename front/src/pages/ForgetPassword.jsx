import React, { useState } from "react";
import axios from "axios";
import CustomButton from "../elements/CustomButton";
import Error from "../messageAndError/Error";
import OutletMainLayout from "../elements/OutletMainLayout";
import OutletPrimaryTab from "../elements/OutletPrimaryTab";
import CustomTitle from "../elements/CustomTitle";
import CustomLabel from "../elements/CustomLabel";
import CustomInput from "../elements/CustomInput";
import SuccessMailSent from "../messageAndError/SuccessMailSent";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
// import myGif from "../../../src/gif/match.gif";

function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const goToHome = () => navigate("/home");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/users/forgotPassword`,
        {
          email,
        }
      );

      if (response.data.status === "success") {
        setMessage({ type: "success", text: response.data.message });
      } else {
        setMessage({ type: "error", text: response.data.message });
      }
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
  const onResetHandler = () => {
    setMessage(null);
  };

  return (
    <OutletMainLayout>
      <OutletPrimaryTab>
        <CustomTitle>Forget Password</CustomTitle>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <CustomLabel>Email</CustomLabel>
            <div className="flex flex-col items-start">
              <CustomInput
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
          </div>
          <div className="flex mt-16 mb-8 justify-center">
            <CustomButton type="submit" disabled={isLoading}>
              Submit
            </CustomButton>
          </div>
        </form>
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
            <CustomButton className="" onClick={goToHome}>
              <p>Home</p>
            </CustomButton>
          </div>
        )}
      </OutletPrimaryTab>
    </OutletMainLayout>
  );
}

export default ForgetPassword;
