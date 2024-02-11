import { useMain } from "../contexts/MainContext";
import CustomLabel from "../elements/CustomLabel";
import { useGetCourses } from "../hooks/useGetCourses";
import { useGetMasters } from "../hooks/useGetMasters";
import { useGetSchools } from "../hooks/useGetSchools";

function GroupsFilterPanel() {
  const { jwtToken } = useMain();
  const { schools } = useGetSchools(jwtToken);
  const { masters } = useGetMasters(jwtToken);
  const { courses } = useGetCourses(jwtToken);
  const { selectedSchool, selectedMaster, dispatch } = useMain();
  return (
    <>
      <div className="mb-4">
        <CustomLabel>School</CustomLabel>
        <select
          onChange={(e) =>
            dispatch({
              type: "main/setSelectedSchool",
              payload: e.target.value,
            })
          }
          className="text-gray-900 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select a School</option>
          {schools?.data?.data?.map((school) => (
            <option key={school._id} value={school._id}>
              {school.name}
            </option>
          ))}
        </select>
      </div>
      {selectedSchool && (
        <div className="mb-4">
          <CustomLabel>Master</CustomLabel>
          <select
            onChange={(e) =>
              dispatch({
                type: "main/setSelectedMaster",
                payload: e.target.value,
              })
            }
            className="text-gray-900 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a Master</option>
            {masters?.data?.data
              ?.filter((master) => master.school === selectedSchool)
              .map((master) => (
                <option key={master._id} value={master._id}>
                  {master.name}
                </option>
              ))}
          </select>
        </div>
      )}
      {selectedMaster && selectedSchool && (
        <div className="mb-4">
          <CustomLabel>Course</CustomLabel>
          <select
            onChange={(e) =>
              dispatch({
                type: "main/setSelectedCourse",
                payload: e.target.value,
              })
            }
            className="text-gray-900 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a Course</option>
            {courses?.data?.data
              ?.filter((course) => course.master === selectedMaster)
              .map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
          </select>
        </div>
      )}
    </>
  );
}

export default GroupsFilterPanel;
