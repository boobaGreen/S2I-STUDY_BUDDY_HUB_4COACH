import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Spinner from "../components/Spinner";
import { useMain } from "../contexts/MainContext";
import { useConfirmAccount } from "../hooks/useConfirmAccount";
import Error from "../messageAndError/Error";
import SuccessConfirm from "../messageAndError/SuccessConfirm";
import OutletMainLayout from "../elements/OutletMainLayout";
import OutletPrimaryTab from "../elements/OutletPrimaryTab";
import CustomTitle from "../elements/CustomTitle";

function ConfirmAccount() {
  const navigate = useNavigate();
  const { token: tokenMail } = useParams();
  const { dispatch: dispatchMain } = useMain();

  const { isLoading, data, error } = useConfirmAccount(tokenMail);

  const token = data?.token;

  useEffect(() => {
    // Clear the authentication token from cookies
    Cookies.set("jwt", token, { secure: true, sameSite: "strict" });
    // Add a timer of 2.5 seconds
    const timer = setTimeout(() => {
      // Redirect to the login page or any other desired page
      dispatchMain({
        type: "main/user/setUser",
        payload: data.data.user,
      });
      dispatchMain({
        type: "main/setJwt",
        payload: token,
      });
      navigate("/home");
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [data, dispatchMain, navigate, token]);
  return (
    <OutletMainLayout>
      <OutletPrimaryTab>
        <CustomTitle>Confirm Account</CustomTitle>
        {isLoading && <Spinner />}
        {error && (
          <div className="flex flex-col justify-center items-center">
            <Error message={error.response.data.message} />
          </div>
        )}
        {data && <SuccessConfirm />}
      </OutletPrimaryTab>
    </OutletMainLayout>
  );
}

export default ConfirmAccount;
