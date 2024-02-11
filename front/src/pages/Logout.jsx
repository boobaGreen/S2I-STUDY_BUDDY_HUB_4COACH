import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import myGifEsc from "../gif/logout.gif";

import { useMain } from "../contexts/MainContext";
import OutletMainLayout from "../elements/OutletMainLayout";
import OutletPrimaryTab from "../elements/OutletPrimaryTab";
import CustomTitle from "../elements/CustomTitle";

function Logout() {
  const navigate = useNavigate();
  const { dispatch: dispatchMain } = useMain();

  useEffect(() => {
    // Clear the authentication token from cookies
    Cookies.remove("jwt");

    // Add a timer of 2.5 seconds
    const timer = setTimeout(() => {
      // Redirect to the login page or any other desired page
      dispatchMain({
        type: "main/user/resetUser",
      });
      // dispatchMain({
      //   type: "main/user/setAuth",
      //   payload: false,
      // });
      navigate("/cover");
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatchMain, navigate]);

  return (
    <OutletMainLayout>
      <OutletPrimaryTab>
        <div className="w-[50%] h-[50%] flex flex-col justify-center items-center">
          <CustomTitle>Logout</CustomTitle>
          <img
            src={myGifEsc}
            alt="Error animations"
            className="object-contain"
          />
        </div>
      </OutletPrimaryTab>
    </OutletMainLayout>
  );
}

export default Logout;
