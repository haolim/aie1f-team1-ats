import * as yup from "yup";

export const candidateSchema = yup.object({
  first_name: yup
    .string()
    .trim()
    .required("First name is required."),

  last_name: yup
    .string()
    .trim()
    .required("Last name is required."),

  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .required("Email is required."),

  mobile: yup
    .string()
    .trim(),

  resume_link: yup
    .string()
    .trim()
    .url("Please enter a valid URL."),

  notes: yup
    .string()
    .trim(),
});