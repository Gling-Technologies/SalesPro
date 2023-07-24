import * as yup from "yup";

const formFieldsMetadata = [
  {
    id: "Test Drive Type",
    name: "Test Drive Type",
    type: "select",
    required: true,
    icon: "car-front-fill",
    placeholder: "Enter a value...",
    validation: yup.string(),
    size: 12,
    defaultValue: "Exit",
  },
  {
    id: "Enquiry Number",
    name: "Enquiry Number",
    icon: "person-fill",
    required: true,
    placeholder: "Pick a number...",
    validation: yup.string(),
    searchable: true,
  },
  {
    id: "Customer Name",
    name: "Customer Name",
    required: true,
    icon: "person-fill",
    placeholder: "Enter a value...",
    validation: yup.string(),
    searchable: true,
  },
  {
    id: "Contact Number",
    name: "Contact Number",
    required: true,
    icon: "telephone-fill",
    placeholder: "Enter a value...",
    minLength: 10,
    maxLength: 10,
    validation: yup.string(),
    searchable: true,
  },
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
    type: "select",
    required: true,
    icon: "person-fill",
    placeholder: "Enter a value...",
    disabled: true,
    validation: yup.string(),
  },
  {
    id: "Test Drive Vehicle",
    name: "Test Drive Vehicle",
    type: "select",
    required: true,
    icon: "car-front-fill",
    placeholder: "Enter a value...",
    validation: yup.string(),
  },
  {
    id: "DL Number",
    name: "DL Number",
    type: "text",
    required: false,
    icon: "123",
    placeholder: "Enter a value...",
    validation: yup.string(),
    dependent: true,
    conditions: [
      {
        field: "Test Drive Type",
        operator: "===",
        value: "Exit",
      },
    ],
  },
  {
    id: "Odometer Reading",
    name: "Odometer Reading",
    type: "number",
    required: true,
    icon: "123",
    placeholder: "Enter a value...",
    dependent: true,
    validation: yup.number(),
    conditions: [
      {
        field: "Test Drive Type",
        operator: "===",
        value: "Exit",
      },
    ],
  },
  {
    id: "Customer Feedback",
    name: "Customer Feedback",
    type: "select",
    required: false,
    icon: "sticky-fill",
    placeholder: "Enter a value...",
    dependent: true,
    // as: "textarea",
    validation: yup.string(),
    conditions: [
      {
        field: "Test Drive Type",
        operator: "===",
        value: "Entry",
      },
    ],
  },
  {
    id: "Approved By",
    name: "Approved By",
    type: "select",
    required: true,
    icon: "person-fill",
    placeholder: "Enter a value...",
    validation: yup.string(),
  },
];

const searchFieldsMeta = [

];

/**
 *  Modifies the schema based upon the internal state of the schema
 *
 * This allows to change schema fields which are dependent on other field values
 * inside the schema
 */
const schemaModifier = (values, schema) => {
  // console.log(values, schema)
  const { "Test Drive Type": driveType } = values[0];
  let newSchema = schema;
  if (driveType === "Exit") {
    newSchema = schema.shape({
      "DL Number": yup.string(),
      "Approved By": yup.number(),
      // "Customer Feedback": yup.mixed((input) => true),
    });
  } else if (driveType === "Entry") {
    newSchema = schema.shape({
      // "DL Number": yup.mixed((input) => true),
      // "Odometer Reading": yup.mixed((input) => true),
      "Customer Feedback": yup.string().required(),
    });
  }
  return newSchema;
};

export default formFieldsMetadata;
export { searchFieldsMeta, schemaModifier };
