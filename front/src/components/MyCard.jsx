import { BeatLoader } from "react-spinners";
import CustomButton from "../elements/CustomButton";
import CustomLineBig from "../elements/CustomLineBig";
import CustomLine from "../elements/CutomLine";

function MyCard({
  groupItem,
  userId,
  deleteGroupMutation,
  setSelectedGroup,
  leaveGroupMutation,
  isDeleting,
  isLeaving,
  handleChatButton,
}) {
  console.log("groupItem: ", groupItem);
  const handleDeleteGroup = (idGroup) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      deleteGroupMutation(idGroup);
      setSelectedGroup(null);
    }
  };

  const handleLeaveGroup = (idGroup) => {
    if (window.confirm("Are you sure you want to leave this group?")) {
      leaveGroupMutation(idGroup);
      setSelectedGroup(null);
    }
  };
  return (
    <div className="p-6 flex flex-col w-[10rem] sm:w-[13rem] md:w-[23rem] text-base sm:text-lg md:text-xl justify-start items-start md:pl-12 shadow-md rounded-3xl bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
      <div className="w-full">
        <CustomLineBig>
          <p className="text-center">{groupItem.name}</p>
        </CustomLineBig>
      </div>
      <div>
        <CustomLine>
          <span>📚</span> <span>{groupItem.course.name.toUpperCase()}</span>
        </CustomLine>
        <CustomLine>
          <span>🎓</span> <span>{groupItem.master.name.toUpperCase()}</span>
        </CustomLine>
        <CustomLine>
          <span>🏫</span> <span>{groupItem.school.name.toUpperCase()}</span>
        </CustomLine>
        {userId === groupItem?.founder?._id ? (
          <CustomLine>⚜️ YOU </CustomLine>
        ) : (
          <CustomLine>
            <span>⚜️ {groupItem?.founder?.userName.toUpperCase()}</span>
          </CustomLine>
        )}
        <CustomLine>
          <span>👨‍👨‍👦‍👦 </span>
          <span>{(groupItem?.participants?.length || 0) + 1}</span> /
          <span>{(groupItem.maxParticipants || 0) + 1}</span>{" "}
        </CustomLine>
        {groupItem?.participants.length > 0 && (
          <CustomLine>
            <span>👨‍👨‍👦‍👦 </span>
            <span>
              {groupItem?.participants
                ? groupItem?.participants
                    .map((participant) => participant?.user?.userName)
                    .join(", ")
                : "N/A"}
            </span>
          </CustomLine>
        )}
      </div>

      <div className="mt-auto w-full flex justify-around">
        <div className="mt-16">
          <CustomButton
            onClick={() =>
              userId === groupItem?.founder?._id
                ? handleDeleteGroup(groupItem._id)
                : handleLeaveGroup(groupItem._id)
            }
            disabled={isDeleting || isLeaving}
          >
            {isDeleting || isLeaving ? <BeatLoader size={10} /> : <p>🗑️</p>}
          </CustomButton>
        </div>
        <div className="mt-16">
          <CustomButton onClick={() => handleChatButton(groupItem)}>
            {isLeaving ? <BeatLoader size={10} /> : <p>💬</p>}
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default MyCard;
