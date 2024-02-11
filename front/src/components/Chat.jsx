import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import MessageSendDx from "../elements/MessageSendDx";
import MessageReceiveSx from "../elements/MessageReceiveSx";
import CustomInputBox from "../elements/CustomInputBox";
import CustomInput from "../elements/CustomInput";
import CustomButton from "../elements/CustomButton";
import { useMain } from "../contexts/MainContext";

function Chat({ username, room, oldMessages }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const { socket } = useMain();
  console.log("ssssssssssssss", socket);

  useEffect(() => {
    setMessageList(oldMessages);
  }, [oldMessages]);

  const sendMessage = async () => {
    if (currentMessage.trim() !== "") {
      const messageData = {
        room: room,
        user: username,
        message: currentMessage,
        date: Date.now(),
      };
      await socket?.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setMessageList((list) => [...list, data]);
    };

    socket?.on("receive_message", handleReceiveMessage);

    return () => {
      socket?.off("receive_message", handleReceiveMessage);
    };
  }, [socket]);

  return (
    <div className="h-[75vh] mb-2 flex flex-col justify-between items-center ">
      <ScrollToBottom className="overflow-y-auto">
        {messageList?.map((messageContent, key) => {
          const isCurrentUser = messageContent.user === username;
          const message =
            typeof messageContent.message === "string"
              ? messageContent.message
              : JSON.stringify(messageContent.message);

          return (
            <div key={key} className="text-black">
              {isCurrentUser ? (
                <MessageSendDx
                  message={message}
                  user={messageContent.user}
                  date={messageContent.date}
                ></MessageSendDx>
              ) : (
                <MessageReceiveSx
                  message={message}
                  user={messageContent.user}
                  date={messageContent.date}
                ></MessageReceiveSx>
              )}
            </div>
          );
        })}
      </ScrollToBottom>
      <div className="mb-6">
        <CustomInputBox>
          <CustomInput
            type="text"
            value={currentMessage}
            placeholder="Hey..."
            onChange={(event) => setCurrentMessage(event.target.value)}
            onKeyPress={(event) => event.key === "Enter" && sendMessage()}
          />
          <div className=" flex justify-center mt-6 w-full">
            <CustomButton onClick={sendMessage}>
              <p className="text-2xl">Send 📡</p>
            </CustomButton>
          </div>
        </CustomInputBox>
      </div>
    </div>
  );
}

export default Chat;
