import OutletMainLayout from "../elements/OutletMainLayout";
import OutletPrimaryTab from "../elements/OutletPrimaryTab";
import CustomTitle from "../elements/CustomTitle";
import { useMain } from "../contexts/MainContext";
import ViewGroups from "../components/ViewGroupsOld";
import CreateGroup from "../components/CreateGroup";
import GroupsFilterPanel from "../components/GroupsFilterPanel";
import { useGetGroups } from "../hooks/useGetGroups";
import MiniPanel from "../components/MiniPanel";
import { useEffect } from "react";

function Groups() {
  const { selectedCourse, jwtToken, userId, groupsActive, dispatch } =
    useMain();
  const { groups, refetch } = useGetGroups(jwtToken);

  useEffect(() => {
    dispatch({
      type: "main/resetSMC",
    });
  }, []);

  useEffect(() => {
    const filteredGroups = groups?.data?.data?.filter((group) => {
      return (
        group.participants.some(
          (participant) => participant?.user?._id === userId
        ) || group?.founder?._id === userId
      );
    });
    dispatch({
      type: "main/setGroupsActive",
      payload: filteredGroups.length,
    });
  }, [dispatch, jwtToken, groups?.data?.data, userId, groupsActive]);

  return (
    <>
      <OutletMainLayout className="justify-around">
        <div className="min-w-[60%]">
          <OutletPrimaryTab className="">
            <CustomTitle>Groups</CustomTitle>
            <GroupsFilterPanel />
            {selectedCourse && groupsActive >= 3 && <MiniPanel></MiniPanel>}
            {selectedCourse && groupsActive < 3 && <CreateGroup />}
          </OutletPrimaryTab>
        </div>
        <ViewGroups groups={groups} refetch={refetch} className="mt-12" />
        <div className="mt-6">
          <OutletPrimaryTab>
            <MiniPanel />
          </OutletPrimaryTab>
        </div>
      </OutletMainLayout>
    </>
  );
}

export default Groups;
