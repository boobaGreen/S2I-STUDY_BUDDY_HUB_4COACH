import { useMutation } from "@tanstack/react-query";
import { useMain } from "../contexts/MainContext";
import { useGetGroups } from "../hooks/useGetGroups";
import axiosClient from "../serviceApi/http-common";
import CustomSlider from "../elements/CustomSlider";
import OutletSlider from "../elements/OutletSlider";
import OutletCards from "../elements/OutletCards";
import CustomTitle from "../elements/CustomTitle";
import Card from "./Card";
import MyCard from "./MyCard";

function ViewGroups() {
  const { selectedSchool, selectedMaster, selectedCourse, userId, jwtToken } =
    useMain();
  const { groups, refetch } = useGetGroups(jwtToken);
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

  const {
    mutate: mutationGroups,
    isPending: isLoading,
    isError,
  } = useMutation({
    mutationFn: (idGroup) => {
      return axiosClient.patch(
        `/groups/join/${idGroup}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
    },
    onSuccess: () => {
      console.log("success Add to a group as New participant !!!!!!!!!!!");
      refetch();
    },
    onError: (error) => {
      console.log("error: ", error);
    },
  });
  const onSubmitHandler = (idGroup) => {
    mutationGroups(idGroup);
  };

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
  return (
    <>
      <CustomTitle>{renderGroupList()}</CustomTitle>
      <OutletSlider>
        <CustomSlider>
          <>
            {filteredGroups?.map((groupItem, key) => (
              <OutletCards className="mx-4" key={key}>
                <Card
                  groupItem={groupItem}
                  userId={userId}
                  onSubmitHandler={onSubmitHandler}
                  isLoading={isLoading}
                ></Card>
              </OutletCards>
            ))}
          </>
        </CustomSlider>
      </OutletSlider>
    </>
  );
}

export default ViewGroups;
