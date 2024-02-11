import * as yup from "yup";

export const schema = yup.object().shape({
  userName: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at max 30 characters")
    .required("Username is required")
    .default("clod"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at max 20 characters")
    .required("Password is required"),
  passwordConfirm: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Confirm Password does not match"),
});