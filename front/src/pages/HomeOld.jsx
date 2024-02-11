import { useMain } from "../contexts/MainContext";
import OutletMainLayout from "../elements/OutletMainLayout";
import OutletPrimaryTab from "../elements/OutletPrimaryTab";
import CustomTitle from "../elements/CustomTitle";
import { useGetGroups } from "../hooks/useGetGroups";
import { useMutation } from "@tanstack/react-query";
import axiosClient from "../serviceApi/http-common";
import { useEffect, useState } from "react";

import Chat from "../components/Chat";
import MyCard from "../components/MyCard";
import OutletMyCards from "../elements/OutletMyCards";
import OutletHomeCards from "../elements/OutletHomeCards";
import CustomButton from "../elements/CustomButton";
import { useNavigate } from "react-router-dom";

function MyGroups() {
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
    mutate: leaveGroupMutation,
    isPending: isLeaving,
    isError: leaveError,
  } = useMutation({
    mutationFn: (idGroup) => {
      return axiosClient.patch(
        `/groups/leave/${idGroup}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
    },
    onSuccess: () => {
      console.log("success Leave the group !!!!!!!!!!!");
      refetch();
    },
    onError: (error) => {
      console.log("error: ", error);
    },
  });
  const {
    mutate: deleteGroupMutation,
    isPending: isDeleting,
    isError: deleteError,
  } = useMutation({
    mutationFn: (idGroup) => {
      return axiosClient.delete(`/groups/${idGroup}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
    },
    onSuccess: () => {
      console.log("success Delete the group !!!!!!!!!!!");
      refetch();
    },
    onError: (error) => {
      console.log("error: ", error);
    },
  });

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
          if (Array.isArray(response.data.data.chat)) {
            setMessages(response.data.data.chat);
          }
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
  return (
    <OutletMainLayout>
      <OutletPrimaryTab>
        <CustomTitle>My Groups</CustomTitle>
        <OutletHomeCards>
          {(filteredGroups?.length === 0 || !filteredGroups) && (
            <div className="flex flex-col justify-center items-center">
              <CustomTitle size="medium">
                You are not part of any group yet ... 😥
              </CustomTitle>
              <CustomTitle size="small">
                create a group or join an existing one from the "Groups" page 🤠
              </CustomTitle>
              <CustomButton onClick={goToGroups}>Groups</CustomButton>
            </div>
          )}
          {filteredGroups?.map((groupItem, key) => (
            <OutletMyCards className="mx-20" key={key}>
              <MyCard
                key={key}
                groupItem={groupItem}
                userId={userId}
                deleteGroupMutation={deleteGroupMutation}
                setSelectedGroup={setSelectedGroup}
                leaveGroupMutation={leaveGroupMutation}
                isDeleting={isDeleting}
                isLeaving={isLeaving}
                handleChatButton={handleChatButton}
              ></MyCard>
            </OutletMyCards>
          ))}
        </OutletHomeCards>
        {selectedGroup && (
          <>
            <CustomTitle className="text-2xl font-bold mb-4">
              Chat for {selectedName}
            </CustomTitle>

            <Chat
              socket={socket} // Use the socketRef.current as the socket prop
              username={userName}
              room={selectedGroup}
              oldMessages={messages}
            />
          </>
        )}
      </OutletPrimaryTab>
    </OutletMainLayout>
  );
}

export default MyGroups;
