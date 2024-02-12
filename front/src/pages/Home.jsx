import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useMain } from "../contexts/MainContext";
import OutletMainLayout from "../elements/OutletMainLayout";
import OutletPrimaryTab from "../elements/OutletPrimaryTab";
import CustomTitle from "../elements/CustomTitle";
import { useGetGroups } from "../hooks/useGetGroups";
import MyCard from "../components/MyCard";
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
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 640);

  const handleChatButton = (group) => {
    setSelectedName(group.name);
    setSelectedGroup(group._id);
    setIsChatOpen(true);
    window.scrollTo({
      top: 220,
      behavior: "smooth", // for smooth scrolling
    });
  };
  const filteredGroups = groups?.data?.data?.filter((group) => {
    return (
      group.participants.some(
        (participant) => participant?.user?._id === userId
      ) || group?.founder?._id === userId
    );
  });

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
    };

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

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
  }, [selectedGroup, jwtToken, socket]);

  console.log("socket", socket);
  return (
    <OutletMainLayout>
      <OutletPrimaryTab>
        <div className="hidden md:blocK">
          <CustomTitle>My Groups</CustomTitle>
        </div>
        <div className="block md:hidden">
          <CustomTitle size={"small"}>My Groups</CustomTitle>
        </div>
        {/* (groups+chat or message) */}
        <div className="mt-12 flex flex-col justify-center items-center">
          {filteredGroups?.length > 0 ? (
            // groups+chat
            <div className="max-w-[95%] flex flex-col justify-center items-center">
              {isSmallScreen ? (
                <Modal
                  isOpen={isChatOpen}
                  onRequestClose={() => setIsChatOpen(false)}
                  style={{ overlay: { zIndex: 1000 } }} // Add this line
                >
                  <button
                    style={{ fontSize: "20px" }}
                    onClick={() => setIsChatOpen(false)}
                  >
                    Close
                  </button>{" "}
                  <Chat
                    username={userName}
                    room={selectedName}
                    oldMessages={messages}
                  />
                </Modal>
              ) : (
                selectedName && (
                  <div className="flex flex-col">
                    <div className="flex flex-col justify-center items-center  mt-6 mb-8 py-4 border-solid border-4">
                      <div className="flex flex-col justify-center items-center">
                        <CustomTitle size={"medium"}>Chat for</CustomTitle>
                        <CustomTitle size={"small"}>{selectedName}</CustomTitle>
                        <CustomTitle size={"medium"}>Group</CustomTitle>
                      </div>
                      <div className="max-w-[95%]">
                        <Chat
                          username={userName}
                          room={selectedName}
                          oldMessages={messages}
                        />
                      </div>
                    </div>
                  </div>
                )
              )}
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
