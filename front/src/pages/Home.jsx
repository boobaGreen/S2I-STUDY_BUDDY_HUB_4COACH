import { useMain } from "../contexts/MainContext";
import OutletMainLayout from "../elements/OutletMainLayout";
import OutletPrimaryTab from "../elements/OutletPrimaryTab";
import CustomTitle from "../elements/CustomTitle";
import { useGetGroups } from "../hooks/useGetGroups";
import { useEffect, useState } from "react";
import MyCard from "../components/MyCard";
import { useNavigate } from "react-router-dom";
import axiosClient from "../serviceApi/http-common";
import {
  useLeaveGroupMutation,
  useDeleteGroupMutation,
} from "../hooks/mutations";
import NoGroups from "../messageAndError/NoGroups";
import Chat from "../components/Chat";

function Home() {
  const { userId, jwtToken, userName, socket } = useMain();
  const { groups, refetch } = useGetGroups(jwtToken);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedName, setSelectedName] = useState("");

  const filteredGroups = groups?.data?.data?.filter((group) => {
    return (
      group.participants.some(
        (participant) => participant?.user?._id === userId
      ) || group?.founder?._id === userId
    );
  });

  const {
    mutate: leaveGroup,
    isPending: isLeaving,
    isError: leaveError,
  } = useLeaveGroupMutation(jwtToken, refetch);

  const {
    mutate: deleteGroup,
    isPending: isDeleting,
    isError: deleteError,
  } = useDeleteGroupMutation(jwtToken, refetch);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedGroup) {
        // Emit "join_room" event for the selected group using the socketRef
        socket.emit("join_room", selectedGroup);

        try {
          const response = await axiosClient.get(
            `/groups/chat/${selectedGroup}`,
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            }
          );
          setMessages(response.data.data.chat);
          console.log("Messages for group clicked:", response.data.data.chat);
        } catch (error) {
          console.error("Error fetching messages:", error.message);
        }
      }
    };

    fetchMessages();
  }, [selectedGroup, jwtToken]);

  const handleChatButton = (group) => {
    setSelectedName(group.name);
    setSelectedGroup(group._id);
  };
  const navigate = useNavigate();
  const goToGroups = () => navigate("/groups");
  console.log("socket", socket);
  return (
    <OutletMainLayout>
      <OutletPrimaryTab>
        <CustomTitle>My Groups</CustomTitle>
        {/* (groups+chat or message) */}
        <div className="mt-12 div che contiene o messaggio o grup+chat">
          {filteredGroups?.length > 0 ? (
            // gropus+chat
            <div>
              <div>
                <Chat
                  username={userName}
                  room={selectedGroup}
                  oldMessages={messages}
                />
              </div>
              <div className="flex flex-col 2xl:flex-row gap-8 ">
                {filteredGroups.map((group, key) => {
                  return (
                    <MyCard
                      key={key}
                      groupItem={group}
                      userId={userId}
                      deleteGroupMutation={deleteGroup}
                      setSelectedGroup={setSelectedGroup}
                      leaveGroupMutation={leaveGroup}
                      isDeleting={isDeleting}
                      isLeaving={isLeaving}
                      handleChatButton={handleChatButton}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <NoGroups />
          )}
        </div>
      </OutletPrimaryTab>
    </OutletMainLayout>
  );
}

export default Home;
