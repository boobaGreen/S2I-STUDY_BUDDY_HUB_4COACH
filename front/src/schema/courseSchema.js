import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Course name must be at least 3 characters")
    .max(60, "Course name must be at max 60 characters"),
});
