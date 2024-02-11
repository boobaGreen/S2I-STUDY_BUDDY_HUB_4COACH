import OutletSecondaryTab from "../elements/OutletSecondaryTab";
import SchoolCreate from "./SchoolCreate";
import MasterCreate from "./MasterCreate";
import CourseCreate from "./CourseCreate";

function AdminAddPanel({ selectedButton }) {
  return (
    <OutletSecondaryTab className="">
      {selectedButton === "Schools" && <SchoolCreate />}
      {selectedButton === "Masters" && <MasterCreate />}
      {selectedButton === "Courses" && <CourseCreate />}
    </OutletSecondaryTab>
  );
}

export default AdminAddPanel;
