import { useMain } from "../contexts/MainContext";
import { useGetGroups } from "../hooks/useGetGroups";
import CustomSlider from "../elements/CustomSlider";
import OutletSlider from "../elements/OutletSlider";
import CustomTitle from "../elements/CustomTitle";
import Card from "./Card";
import { useJoinGroupMutation } from "../hooks/mutations";

function ViewGroups() {
  const { selectedSchool, selectedMaster, selectedCourse, userId, jwtToken } =
    useMain();
  const { groups, refetch } = useGetGroups(jwtToken);
  const {
    mutate: mutationGroups,
    isPending: isLoading,
    isError,
  } = useJoinGroupMutation(jwtToken, refetch);
  const filteredGroups = groups?.data?.data?.filter((group) => {
    if (selectedCourse) {
      return group.course._id === selectedCourse;
    } else if (selectedMaster) {
      return group.master._id === selectedMaster;
    } else if (selectedSchool) {
      return group.school._id === selectedSchool;
    } else {
      return true;
    }
  });
  function renderGroupList() {
    if (selectedCourse) {
      return <span>Groups list for Selected Course</span>;
    } else if (selectedMaster) {
      return <span>Groups list for Selected Master</span>;
    } else if (selectedSchool) {
      return <span>Groups list for Selected School</span>;
    } else {
      return <span>All Groups</span>;
    }
  }
  const onSubmitHandler = (idGroup) => {
    mutationGroups(idGroup);
  };

  return (
    <>
      {filteredGroups && filteredGroups.length > 2 ? (
        <div className=" overflow-hidden ">
          <CustomTitle>{renderGroupList()}</CustomTitle>
          <div className="slider-container">
            <OutletSlider>
              <CustomSlider>
                {filteredGroups?.map((groupItem, key) => (
                  <div className="" key={key}>
                    {/* //mx4 nel div sopra*/}
                    <Card
                      groupItem={groupItem}
                      userId={userId}
                      onSubmitHandler={onSubmitHandler}
                      isLoading={isLoading}
                    ></Card>
                  </div>
                ))}
              </CustomSlider>
            </OutletSlider>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center gap-8 flex-col md:flex-row ">
          {filteredGroups?.map((groupItem, key) => (
            <div className="" key={key}>
              {/* //mx4 nel div sopra*/}
              <Card
                groupItem={groupItem}
                userId={userId}
                onSubmitHandler={onSubmitHandler}
                isLoading={isLoading}
              ></Card>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
export default ViewGroups;
