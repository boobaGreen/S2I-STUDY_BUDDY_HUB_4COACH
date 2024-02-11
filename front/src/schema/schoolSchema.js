import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "School name must be at least 3 characters")
    .max(60, "School name must be at max 60 characters"),
  site: yup.string().url("Url address here plese"),
});
