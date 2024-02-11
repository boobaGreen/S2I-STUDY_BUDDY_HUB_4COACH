// Cover.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../elements/CustomButton";
import OutletPrimaryTab from "../elements/OutletPrimaryTab";
import OutletMainLayout from "../elements/OutletMainLayout";
// import CustomButton from "../elements/CustomButton";

function Cover() {
  // const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const goToLogin = () => navigate("/login");
  const goToSignup = () => navigate("/signup");

  // <div className="max-w-full h-screen ">
  //   <div
  //     className={`w-full h-full bg-top flex flex-col justify-center items-center `}
  //   >
  //     <div
  //       className={
  //         "gap-6 px-6 flex justify-between py-4 mt-6 overflow-hidden  shadow-md sm:max-w-lg sm:rounded-lg bg-[var(--color-bg-tab)] dark:bg-[var(--color-bg-tab-dark)] text-[var(--color-text-tab)] dark:text-[var(--color-text-tab-dark)] "
  //       }
  //     >
  return (
    <OutletMainLayout>
      <div className=" w-[90%] md:w-[50%] flex justify-center self-center mt-24 ">
        <OutletPrimaryTab>
          <div className="flex gap-8 w-full justify-center">
            <div className="flex items-center">
              <CustomButton onClick={goToSignup}>
                <p>Sign Up</p>
              </CustomButton>
            </div>
            <div className="flex items-center ">
              <CustomButton onClick={goToLogin}>
                <p>Login</p>
              </CustomButton>
            </div>
          </div>
        </OutletPrimaryTab>
      </div>
    </OutletMainLayout>
  );
}

export default Cover;
