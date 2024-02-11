import { useForm } from "react-hook-form";
import CustomButton from "../elements/CustomButton";
import CustomInput from "../elements/CustomInput";
import CustomInputBox from "../elements/CustomInputBox";
import CustomLabel from "../elements/CustomLabel";
import CustomTitle from "../elements/CustomTitle";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../schema/schoolSchema";
import { useGetSchools } from "../hooks/useGetSchools";
import { useMutation } from "@tanstack/react-query";
import axiosClient from "../serviceApi/http-common";
import { BeatLoader } from "react-spinners";
import { useMain } from "../contexts/MainContext";

function SchoolCreate() {
  const { jwtToken } = useMain();
  const { refetch } = useGetSchools(jwtToken);

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
        site: "",
      });
    }, 5);
  };
  const {
    mutate: mutationSchools,
    isPending: isLoading,
    isError,
  } = useMutation({
    mutationFn: (newSchool) => {
      return axiosClient.post("/schools", newSchool, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
    },
    onSuccess: () => {
      console.log("success school create !!!!!!!!!!!");
      refetch();
      onResetHandler();
    },
    onError: (error) => {
      console.log("error: ", error);
    },
  });
  const onSubmitHandler = (data) => {
    mutationSchools(data);
  };

  return (
    <>
      {/* {isLoadingSchools && <Spinner />}
        {errorSchools && <Error />} */}
      <CustomTitle>Add Schools</CustomTitle>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        {/* //NAME */}
        <div className="mt-4">
          <CustomLabel>School Name</CustomLabel>
          <CustomInputBox>
            <CustomInput type="text" {...register("name")} name="name" />
            <div className="">{errors.name?.message}</div>
          </CustomInputBox>
        </div>
        {/* //SITE*/}
        <div className="mt-4">
          <CustomLabel>Website</CustomLabel>
          <CustomInputBox>
            <CustomInput type="site" {...register("site")} name="site" />
          </CustomInputBox>

          <div className="">{errors.site?.message}</div>
        </div>

        {/* //CREATE*/}
        <div className="flex items-center justify-center m-6">
          <CustomButton
            type="submit"
            onClick={handleSubmit(onSubmitHandler)}
            disabled={isLoading}
          >
            {isLoading ? <BeatLoader size={10} /> : <p>Add School</p>}
          </CustomButton>
        </div>
      </form>
    </>
  );
}

export default SchoolCreate;
