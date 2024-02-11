import { useForm } from "react-hook-form";
import { useMain } from "../contexts/MainContext";
import CustomButton from "../elements/CustomButton";
import CustomLabel from "../elements/CustomLabel";
import CustomInput from "../elements/CustomInput";
import CustomInputBox from "../elements/CustomInputBox";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../schema/groupSchema";
import { useGetGroups } from "../hooks/useGetGroups";
import axiosClient from "../serviceApi/http-common";
import { useMutation } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";

function CreateGroup() {
  const {
    selectedSchool,
    selectedMaster,
    selectedCourse,
    jwtToken,
    userId,
    dispatch,
  } = useMain();
  const { refetch } = useGetGroups(jwtToken);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onResetHandler = () => {
    clearErrors();
    setTimeout(() => {
      reset({
        name: "",
      });
    }, 5);
  };
  const {
    mutate: mutationMasters,
    isPending: isLoading,
    isError,
  } = useMutation({
    mutationFn: (newGroup) => {
      return axiosClient.post("/groups", newGroup, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
    },
    onSuccess: () => {
      console.log("success Group create !!!!!!!!!!!");
      refetch();
      onResetHandler();
    },
    onError: (error) => {
      console.log("error: ", error);
    },
  });
  const onSubmitHandler = (data) => {
    const completeData = {
      name: data.name,
      course: selectedCourse,
      master: selectedMaster,
      school: selectedSchool,
      founder: userId,
    };
    mutationMasters(completeData);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="mb-4">
        <div className="mt-4">
          <CustomLabel>Group Name</CustomLabel>
          <CustomInputBox>
            <CustomInput type="name" {...register("name")} name="name" />
          </CustomInputBox>
          <div className="">{errors.name?.message}</div>
        </div>
        {/* //CREATE*/}
        <div className="w-full flex justify-center mt-6">
          <CustomButton
            type="submit"
            onClick={handleSubmit(onSubmitHandler)}
            disabled={isLoading}
          >
            {isLoading ? <BeatLoader size={10} /> : <p>➕</p>}
          </CustomButton>
        </div>
      </form>
    </div>
  );
}

export default CreateGroup;
