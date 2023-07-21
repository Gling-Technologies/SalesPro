import * as yup from "yup";

const searchFieldsMeta = [
  {
    id: "Enquiry Number",
    name: "Enquiry Number",
    icon: "person-fill",
    required: true,
    placeholder: "Pick a number...",
    validation: yup.string(),
  },
  {
    id: "Customer Name",
    name: "Customer Name",
    required: true,
    icon: "person-fill",
    placeholder: "Enter a value...",
    validation: yup.string(),
  },
  {
    id: "Contact Number",
    name: "Contact Number",
    required: true,
    icon: "telephone-fill",
    placeholder: "Enter a value...",
    validation: yup
      .string()
      .matches(/^[0-9]{10}$/, "Mobile Number is not valid!"),
  },
];

const formFieldsMetadata = [
  // {
  //   name: "Email Address",
  //   icon: "envelope-at-fill",
  //   type: "email",
  //   required: true,
  //   placeholder: "Enter a value...",
  //   disabled: true,
  //   validation: yup.string().email(),
  // },
  {
    name: "Model",
    icon: "car-front-fill",
    type: "select",
    required: true,
    placeholder: "Enter a value...",
    disabled: true,
    validation: yup.string(),
  },
  {
    name: "Vehicle Colour",
    icon: "hash",
    type: "select",
    required: true,
    disabled: true,
    placeholder: "Select a variant...",
    validation: yup.string(),
  },
  {
    name: "Vehicle Number",
    icon: "hash",
    type: "text",
    required: true,
    placeholder: "Enter a value...",
    validation: yup.string(),
  },
  {
    name: "Delivery Date",
    icon: "hash",
    type: "date",
    required: true,
    placeholder: "",
    validation: yup
      .string()
      .transform((dateString) => dateString.split("-").reverse().join("/")),
  },
  {
    name: "Sales Person Name",
    type: "select",
    required: true,
    icon: "person-fill",
    placeholder: "Enter a value...",
    disabled: true,
    validation: yup.string(),
  },
  {
    name: "Delivery Photograph",
    icon: "hash",
    type: "file",
    required: true,
    placeholder: "Pick a number...",
    validation: yup.string(),
  },
  // {
  //   name: "Other",
  //   icon: "hash",
  //   type: "file",
  //   required: true,
  //   placeholder: "Pick a number...",
  //   validation: yup.string(),
  // },
  {
    name: "Customer Remarks",
    type: "text",
    required: true,
    icon: "sticky-fill",
    placeholder: "Enter a value...",
    as: "textarea",
    validation: yup.string(),
  },
];

export default formFieldsMetadata;
export { searchFieldsMeta };
