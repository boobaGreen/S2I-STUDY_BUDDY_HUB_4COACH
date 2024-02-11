import { useMain } from "../contexts/MainContext";
import CustomTitle from "../elements/CustomTitle";
import { useGetCourses } from "../hooks/useGetCourses";
import { useGetMasters } from "../hooks/useGetMasters";
import { useGetSchools } from "../hooks/useGetSchools";
import Error from "../messageAndError/Error";
import OutletSecondaryTab from "../elements/OutletSecondaryTab";
import Spinner from "./Spinner";

function AdminViewPanel({ selectedButton }) {
  const { jwtToken } = useMain();
  const { isLoadingSchools, schools, errorSchools } = useGetSchools(jwtToken);
  const { isLoadingMasters, masters, errorMasters } = useGetMasters(jwtToken);
  const { isLoadingCourses, courses, errorCourses } = useGetCourses(jwtToken);
  const { selectedSchool, selectedMaster } = useMain();
  console.log();
  return (
    <OutletSecondaryTab className="">
      {selectedButton === "Schools" && (
        <>
          {isLoadingSchools && <Spinner />}
          {errorSchools && <Error />}
          <CustomTitle>Schools List</CustomTitle>
          {schools?.data?.data?.map((schoolItem, key) => (
            <div key={key} className="flex justify-start gap-6 pt-4 text-2xl">
              <span>📌</span>
              <span>{schoolItem.name}</span>
            </div>
          ))}
        </>
      )}
      {selectedButton === "Masters" && (
        <>
          {isLoadingMasters && <Spinner />}
          {errorMasters && <Error />}
          <CustomTitle>Masters List</CustomTitle>
          {masters?.data?.data
            ?.filter((masterItem) =>
              selectedSchool ? masterItem.school === selectedSchool : true
            )
            .map((masterItem, key) => (
              <div key={key} className="flex justify-start gap-6 pt-4 text-2xl">
                <span>📌</span>
                <span>{masterItem.name}</span>
              </div>
            ))}
        </>
      )}
      {selectedButton === "Courses" && (
        <>
          {isLoadingCourses && <Spinner />}
          {errorCourses && <Error />}
          <CustomTitle>Courses List</CustomTitle>
          {courses?.data?.data
            ?.filter((courseItem) =>
              selectedMaster
                ? courseItem.master === selectedMaster
                : selectedSchool
                  ? courseItem.school === selectedSchool
                  : true
            )
            .map((courseItem, key) => (
              <div key={key} className="flex justify-start gap-6 pt-4 text-2xl">
                {console.log(courseItem)}
                <span>📌</span>
                <span>{courseItem.name}</span>
                <span>{courseItem.master.name}</span>
                <span>{courseItem.school.name}</span>
              </div>
            ))}
        </>
      )}
    </OutletSecondaryTab>
  );
}

export default AdminViewPanel;
