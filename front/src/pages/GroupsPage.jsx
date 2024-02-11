import OutletMainLayout from "../elements/OutletMainLayout";
import OutletPrimaryTab from "../elements/OutletPrimaryTab";
import CustomTitle from "../elements/CustomTitle";
import { useMain } from "../contexts/MainContext";
import { useGetGroups } from "../hooks/useGetGroups";
import { useEffect } from "react";
import GroupsFilterPanel from "../components/GroupsFilterPanel";
import MiniPanel from "../components/MiniPanel";
import CreateGroup from "../components/CreateGroup";
import ViewGroups from "../components/ViewGroups";

function GroupsPage() {
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
      payload: filteredGroups?.length,
    });
  }, [dispatch, jwtToken, groups?.data?.data, userId, groupsActive]);
  return (
    <OutletMainLayout>
      <OutletPrimaryTab>
        {/* title 1/4 */}
        <div>
          <CustomTitle>Groups</CustomTitle>
        </div>
        {/* filter panel group 2/4 */}
        <div>
          <GroupsFilterPanel />
        </div>
        <div>
          <MiniPanel />
          {selectedCourse && groupsActive < 3 && <CreateGroup />}
        </div>
        {/* minipanel+create group 3/4 */}

        {/* slide groups 4/4 */}
        <div className="w-full overflow-hidden py-6">
          <ViewGroups />
        </div>
      </OutletPrimaryTab>
    </OutletMainLayout>
  );
}

export default GroupsPage;
