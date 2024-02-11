import { useForm } from "react-hook-form";
import { useGetMasters } from "../hooks/useGetMasters";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../schema/masterSchema";
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

function MasterCreate() {
  const { dispatch, jwtToken } = useMain();
  const { schools } = useGetSchools(jwtToken);
  const { refetch } = useGetMasters(jwtToken);
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
    mutationFn: (newMaster) => {
      return axiosClient.post("/masters", newMaster, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
    },
    onSuccess: () => {
      console.log("success master create !!!!!!!!!!!");
      refetch();
      onResetHandler();
    },
    onError: (error) => {
      console.log("error: ", error);
    },
  });
  const onSubmitHandler = (data) => {
    mutationMasters(data);
  };
  console.log("schools: ", schools);
  return (
    <>
      <CustomTitle>Add Masters</CustomTitle>
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
          {/* <p className="text-red-500 text-xs italic"> */}
          {/* {errorsMaster.school?.message} */}
          {/* </p> */}
        </div>
        <div className="mt-4">
          <CustomLabel>Master Name</CustomLabel>
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
            {isLoading ? <BeatLoader size={10} /> : <p>Add Master</p>}
          </CustomButton>
        </div>
      </form>
    </>
  );
}

export default MasterCreate;
