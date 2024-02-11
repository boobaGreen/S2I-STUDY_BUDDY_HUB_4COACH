// page to display when favourite list is empty

import { useMoveBack } from "../hooks/useMoveBack";
import CustomButton from "../elements/CustomButton";
import OutletMainLayout from "../elements/OutletMainLayout";
import OutletPrimaryTab from "../elements/OutletPrimaryTab";
import CustomTitle from "../elements/CustomTitle";
import Error from "../messageAndError/Error";

function PageNotFound() {
  const moveBack = useMoveBack();
  return (
    <OutletMainLayout>
      <OutletPrimaryTab>
        <CustomTitle>404</CustomTitle>
        <div className="flex flex-col justify-center items-center">
          <Error
            message={"The page you are looking for could not be found"}
          ></Error>
          <CustomButton onClick={moveBack} size="large">
            &larr; Go back
          </CustomButton>
        </div>
      </OutletPrimaryTab>
    </OutletMainLayout>
  );
}

export default PageNotFound;
