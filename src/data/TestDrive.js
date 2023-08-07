import * as yup from "yup";

const entryFormFieldsMetadata = [
  {
    id: "Test Drive Number",
    name: "Test Drive Number",
    icon: "person-fill",
    required: true,
    placeholder: "Enter a value...",
    validation: yup.string(),
    typeahead: true,
  },
  {
    id: "Customer Name",
    name: "Customer Name",
    required: true,
    icon: "person-fill",
    placeholder: "Enter a value...",
    validation: yup.string(),
    disabled: true,
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
    disabled: true,
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
    disabled: true,
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
    disabled: true,
  },
  {
    id: "Odometer Reading",
    name: "Odometer Reading",
    type: "number",
    required: true,
    icon: "123",
    placeholder: "Enter a value...",
    validation: yup.number(),
  },
  {
    id: "Customer Feedback",
    name: "Customer Feedback",
    type: "select",
    required: false,
    icon: "sticky-fill",
    placeholder: "Enter a value...",
    // as: "textarea",
    validation: yup.string(),
  },
  {
    name: "Customer Remarks",
    type: "text",
    icon: "sticky-fill",
    placeholder: "Enter a value...",
    as: "textarea",
    size: 12,
    validation: yup.string(),
  },
];

const exitFormFieldsMetadata = [
  // {
  //   id: "Test Drive Type",
  //   name: "Test Drive Type",
  //   type: "select",
  //   required: true,
  //   icon: "car-front-fill",
  //   placeholder: "Enter a value...",
  //   validation: yup.string(),
  //   defaultValue: "Exit",
  // },
  {
    id: "Enquiry Number",
    name: "Enquiry Number",
    icon: "person-fill",
    required: true,
    placeholder: "Enter a value...",
    validation: yup.string(),
    typeahead: true,
  },
  {
    id: "Customer Name",
    name: "Customer Name",
    required: true,
    icon: "person-fill",
    placeholder: "Enter a value...",
    validation: yup.string(),
    typeahead: true,
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
    typeahead: true,
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
    type: "text",
    required: true,
    icon: "person-fill",
    placeholder: "Enter a value...",
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
  },
  {
    id: "Odometer Reading",
    name: "Odometer Reading",
    type: "number",
    required: true,
    icon: "123",
    placeholder: "Enter a value...",
    validation: yup.number(),
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
      "DL Number": yup.string().required(),
      "Approved By": yup.string().required(),
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

const testDrive = {
  entryFormFieldsMetadata,
  exitFormFieldsMetadata,
  schemaModifier,
};

export default testDrive;
export { entryFormFieldsMetadata, exitFormFieldsMetadata, schemaModifier };
