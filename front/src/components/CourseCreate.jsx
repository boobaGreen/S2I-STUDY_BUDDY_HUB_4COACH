import { useForm } from "react-hook-form";
import { useGetMasters } from "../hooks/useGetMasters";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../schema/courseSchema";
import { useMutation } from "@tanstack/react-query";
import axiosClient from "../serviceApi/http-common";
import { useGetSchools } from "../hooks/useGetSchools";
import CustomTitle from "../elements/CustomTitle";
import CustomLabel from "../elements/CustomLabel";
import CustomInputBox from "../elements/CustomInputBox";
import CustomInput from "../elements/CustomInput";
import CustomButton from "../elements/CustomButton";
import { BeatLoader } from "react-spinners";
import { useMain } from "../contexts/MainContext";
import { useGetCourses } from "../hooks/useGetCourses";

function MasterCreate() {
  const { dispatch, selectedSchool, jwtToken } = useMain();
  const { schools } = useGetSchools(jwtToken);
  const { masters } = useGetMasters(jwtToken);
  const { refetch } = useGetCourses(jwtToken);
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
    mutate: mutationCourse,
    isPending: isLoading,
    isError,
  } = useMutation({
    mutationFn: (newCourse) => {
      return axiosClient.post("/courses", newCourse, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
    },
    onSuccess: () => {
      console.log("success course create !!!!!!!!!!!");
      refetch();
      onResetHandler();
    },
    onError: (error) => {
      console.log("error: ", error);
    },
  });
  const onSubmitHandler = (data) => {
    mutationCourse(data);
  };

  return (
    <>
      <CustomTitle>Add Course</CustomTitle>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="mb-4">
        <div className="mb-4">
          <CustomLabel>School</CustomLabel>
          <select
            {...register("school")}
            onChange={(e) =>
              dispatch({
                type: "main/setSelectedSchool",
                payload: e.target.value,
              })
            }
            className="text-gray-900 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a School</option>
            {schools?.data?.data?.map((school) => (
              <option key={school._id} value={school._id}>
                {school.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <CustomLabel>Master</CustomLabel>
          <select
            {...register("master")}
            onChange={(e) =>
              dispatch({
                type: "main/setSelectedMaster",
                payload: e.target.value,
              })
            }
            className="text-gray-900 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a Master</option>
            {masters?.data?.data
              ?.filter((master) => master.school === selectedSchool)
              .map((master) => (
                <option key={master._id} value={master._id}>
                  {master.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mt-4">
          <CustomLabel>Course Name</CustomLabel>
          <CustomInputBox>
            <CustomInput type="name" {...register("name")} name="name" />
          </CustomInputBox>
          <div className="">{errors.name?.message}</div>
        </div>
        {/* //CREATE*/}
        <div className="flex items-center justify-center m-6">
          <CustomButton
            type="submit"
            onClick={handleSubmit(onSubmitHandler)}
            disabled={isLoading}
          >
            {isLoading ? <BeatLoader size={10} /> : <p>Add Course</p>}
          </CustomButton>
        </div>
      </form>
    </>
  );
}

export default MasterCreate;
