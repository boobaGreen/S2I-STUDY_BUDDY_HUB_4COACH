import React from "react";
import CustomButton from "../elements/CustomButton";
import { BeatLoader } from "react-spinners";
import { useMain } from "../contexts/MainContext";
import CustomLineBig from "../elements/CustomLineBig";
import CustomLine from "../elements/CutomLine";

function Card({ groupItem, userId, onSubmitHandler, isLoading }) {
  const { groupsActive } = useMain();

  return (
    groupItem && (
      <div className=" w-[12rem] sm:w-[15rem] h-[33rem] text-sm sm:text-base  lg:text-lg xl:text-xl p-4 rounded-3xl bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
        <div className=" flex justify-center ">
          <div className="mb-8">
            <CustomLineBig>
              <span>{groupItem.name}</span>
            </CustomLineBig>
          </div>
        </div>
        <div className="">
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
            <CustomLine> ⚜️ YOU </CustomLine>
          ) : (
            <CustomLine>
              <span>⚜️ {groupItem?.founder?.userName?.toUpperCase()}</span>
            </CustomLine>
          )}
          <CustomLine>
            <span>👨‍👨‍👦‍👦 </span>{" "}
            <span>{(groupItem?.participants?.length || 0) + 1}</span> /
            <span>{(groupItem.maxParticipants || 0) + 1}</span>{" "}
          </CustomLine>
          {/* {groupItem?.participants.length > 0 ? (
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
          ) : (
            <CustomLine>
              <span>👨‍👨‍👦‍👦 </span>
              <span>Only founder</span>
            </CustomLine>
          )} */}

          {groupItem?.participants?.some(
            (participant) => participant?.user?._id === userId
          ) && <p className="mt-6"> ✔️ You're IN </p>}

          {!groupItem?.participants?.some(
            (participant) => participant?.user?._id === userId
          ) &&
            userId !== groupItem?.founder?._id &&
            groupItem?.participants?.length < groupItem?.maxParticipants &&
            groupsActive < 3 && (
              <div className="flex justify-center mt-12">
                <CustomButton
                  onClick={() => onSubmitHandler(groupItem?._id)}
                  disabled={isLoading}
                >
                  {isLoading ? <BeatLoader size={10} /> : <p>Join</p>}
                </CustomButton>
              </div>
            )}
        </div>
      </div>
    )
  );
}

export default Card;
