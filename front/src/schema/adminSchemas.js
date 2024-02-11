import * as yup from "yup";

export const schoolSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Username must be at least 3 characters")
    .max(50, "Max 50 characters"),
  site: yup.string().url("Invalid URL").required("Site URL is required"),
});

export const masterSchema = yup.object().shape({
  name: yup.string().required("Name is required").max(50, "Max 50 characters"),
});

export const courseSchema = yup.object().shape({
  name: yup.string().required("Name is required").max(50, "Max 50 characters"),
  master: yup.string().required("Master is required"),
  school: yup.string().required("School is required"),
});
