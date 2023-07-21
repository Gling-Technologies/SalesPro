import * as yup from "yup";

const formFieldsMetadata = [
  {
    id: "Customer Name",
    name: "Customer Name",
    type: "text",
    required: true,
    icon: "person-fill",
    placeholder: "Enter a value...",
    validation: yup.string(),
  },
  {
    id: "Contact Number",
    name: "Contact Number",
    type: "tel",
    required: true,
    icon: "telephone-fill",
    placeholder: "Enter a value...",
    minLength: 10,
    maxLength: 10,
    validation: yup
      .string()
      .matches(
        /^[0-9]{10}$/,
        "Mobile number is not valid! Enter 10 digits number."
      ),
  },
  {
    id: "Email Address",
    name: "Email Address",
    type: "email",
    required: false,
    icon: "envelope-at-fill",
    placeholder: "Enter a value...",
    validation: yup.string().email(),
  },
  {
    id: "Address",
    name: "Address",
    type: "text",
    required: true,
    icon: "geo-alt-fill",
    placeholder: "Enter a value...",
    validation: yup.string(),
  },
  {
    id: "Source of Enquiry",
    name: "Source of Enquiry",
    type: "select",
    required: true,
    icon: "person-fill",
    placeholder: "Enter a value...",
    validation: yup.string(),
  },
  {
    id: "Model",
    name: "Model",
    type: "text",
    required: true,
    icon: "car-front-fill",
    placeholder: "Enter a value...",
    validation: yup.string(),
  },
  {
    id: "Sales Person Name",
    name: "Sales Person Name",
    type: "text",
    required: true,
    icon: "person-fill",
    placeholder: "Enter a value...",
    validation: yup.string(),
  },
  {
    id: "Customer Remarks",
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
