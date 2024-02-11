import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Master name must be at least 3 characters")
    .max(60, "Master name must be at max 60 characters"),
});
