import OutletMainLayout from "../elements/OutletMainLayout";
import OutletPrimaryTab from "../elements/OutletPrimaryTab";
import CustomButton from "../elements/CustomButton";
import CustomTitle from "../elements/CustomTitle";
import { useState } from "react";
import AdminViewPanel from "../components/AdminViewPanel";
import AdminAddPanel from "../components/AdminAddPanel";

function AdminPanel() {
  const [selectedButton, setSelectedButton] = useState("Schools");
  return (
    <OutletMainLayout className="">
      <OutletPrimaryTab className="">
        <CustomTitle>Admin Panel</CustomTitle>
        <div className="flex justify-center items-center gap-4 mt-8">
          <CustomButton
            onClick={() => {
              setSelectedButton("Schools");
            }}
          >
            Schools
          </CustomButton>
          <CustomButton
            onClick={() => {
              setSelectedButton("Masters");
            }}
          >
            Masters
          </CustomButton>
          <CustomButton
            onClick={() => {
              setSelectedButton("Courses");
            }}
          >
            Courses
          </CustomButton>
        </div>
      </OutletPrimaryTab>
      <AdminAddPanel selectedButton={selectedButton} />
      <AdminViewPanel selectedButton={selectedButton} />
    </OutletMainLayout>
  );
}

export default AdminPanel;
