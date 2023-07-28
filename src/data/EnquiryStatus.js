import * as yup from "yup";

const formFieldsMetadata = [
  {
    id: "Email Address",
    name: "Email Address",
    type: "email",
    required: true,
    icon: "envelope-at-fill",
    placeholder: "Enter a value...",
    disabled: true,
    validation: yup.string().email(),
  },
  {
    id: "Address",
    name: "Address",
    type: "text",
    required: false,
    icon: "geo-alt-fill",
    placeholder: "Enter a value...",
    disabled: true,
    validation: yup.string(),
  },
  {
    id: "Source of Enquiry",
    name: "Source of Enquiry",
    type: "select",
    required: true,
    icon: "person-fill",
    placeholder: "Enter a value...",
    disabled: true,
    validation: yup.string(),
  },
  {
    id: "Model",
    name: "Model",
    type: "select",
    required: true,
    icon: "car-front-fill",
    placeholder: "Enter a value...",
    disabled: false,
    validation: yup.string(),
  },
  {
    id: "Sales Person Name",
    name: "Sales Person Name",
    type: "text",
    required: true,
    icon: "person-fill",
    placeholder: "Enter a value...",
    disabled: true,
    validation: yup.string(),
  },
  {
    id: "Customer Type",
    name: "Customer Type",
    type: "select",
    required: false,
    icon: "patch-question",
    placeholder: "Enter a value...",
    validation: yup.string(),
  },
  {
    id: "Visit Type",
    name: "Visit Type",
    type: "select",
    required: false,
    icon: "patch-question",
    placeholder: "Enter a value...",
    validation: yup.string(),
  },
  {
    id: "CRM ID",
    name: "CRM ID",
    type: "text",
    required: true,
    icon: "hash",
    placeholder: "Enter a value...",
    validation: yup.string(),
  },
  {
    id: "Enquiry Status",
    name: "Enquiry Status",
    type: "select",
    required: true,
    icon: "sticky-fill",
    placeholder: "Enter a value...",
    validation: yup.string(),
  },
  {
    id: "Priority",
    name: "Priority",
    type: "select",
    required: true,
    icon: "sticky-fill",
    placeholder: "Enter a value...",
    validation: yup.string(),
  },
  {
    id: "Next Follow Up Date",
    name: "Next Follow Up Date",
    type: "date",
    required: false,
    icon: "sticky-fill",
    placeholder: "Enter a value...",
    validation: yup.string(),
    dependent: true,
    conditions: [
      {
        field: "Enquiry Status",
        operator: "===",
        value: "In Process",
      },
    ],
  },
  {
    id: "Customer Remarks",
    name: "Customer Remarks",
    type: "text",
    required: true,
    icon: "sticky-fill",
    placeholder: "Enter a value...",
    as: "textarea",
    size: 12,
    validation: yup.string(),
  },
];

const searchFieldsMeta = [
  {
    id: "Enquiry Number",
    name: "Enquiry Number",
    icon: "person-fill",
    required: true,
    placeholder: "Enter a value...",
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

const schemaModifier = (values, schema) => {
  const { "Enquiry Status": enquiryStatus } = values[0];
  let newSchema = schema;
  if (enquiryStatus === "In Process") {
    newSchema = schema.shape({
      "Next Follow Up Date": yup.string().required(),
    });
  }
  return newSchema;
};

export default formFieldsMetadata;
export { searchFieldsMeta, schemaModifier };
