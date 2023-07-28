import * as yup from "yup";

const sectionsMeta = [
  {
    title: "General",
    fields: [
      {
        id: "Booking Number",
        name: "Booking Number",
        icon: "person-fill",
        placeholder: "Pick a number...",
        validation: yup.string(),
        searchable: true,
      },
      {
        id: "Customer Name",
        name: "Customer Name",
        searchable: true,
        icon: "person-fill",
        placeholder: "Enter a value...",
        validation: yup.string(),
      },
      {
        id: "Contact Number",
        name: "Contact Number",
        searchable: true,
        icon: "telephone-fill",
        placeholder: "Enter a value...",
        validation: yup
          .string()
          .matches(/^[0-9]{10}$/, "Mobile Number is not valid!"),
      },
      {
        name: "Model Variant",
        icon: "car-front-fill",
        type: "select",
        placeholder: "Select a variant...",
        validation: yup.string(),
      },
      {
        name: "Sales Person Name",
        type: "text",
        icon: "person-fill",
        placeholder: "Enter a value...",
        validation: yup.string(),
      },
      {
        name: "Alotted Chassis Number",
        icon: "hash",
        type: "text",
        placeholder: "Enter a value...",
        validation: yup.string(),
      },
      {
        name: "Case Type",
        type: "select",
        icon: "person-fill",
        validation: yup.string(),
      },
    ],
  },
  {
    title: "Financier Section",
    dependent: true,
    conditions: [
      {
        field: "Case Type",
        operator: "===",
        value: "Finance",
      },
    ],
    fields: [
      {
        name: "Finance Type",
        icon: "hash",
        type: "select",
        validation: yup.string(),
        dependent: true,
      },
      {
        name: "Financier Name",
        icon: "person-fill",
        type: "text",
        placeholder: "Enter a value...",
        validation: yup.string(),
        dependent: true,
      },
      // {
      //   name: "Financier Contact Person Name",
      //   icon: "person-fill",
      //   type: "text",
      //   placeholder: "Enter a value...",
      //   validation: yup.string(),
      // },
      {
        name: "Financier Contact Number",
        icon: "telephone-fill",
        type: "tel",
        placeholder: "Enter a value...",
        validation: yup.string(),
        dependent: true,
      },
      {
        name: "Finance Amount",
        icon: "123",
        type: "number",
        placeholder: "Enter a value...",
        validation: yup.string(),
        dependent: true,
      },
      {
        name: "DO Upload",
        icon: "123",
        type: "file",
        placeholder: "Enter a value...",
        validation: yup.string().url(),
        dependent: true,
      },
    ],
  },
  {
    title: "Discount?",
    fields: [
      {
        name: "Any Change in Discount?",
        icon: "hash",
        type: "select",
        validation: yup.string(),
      },
    ],
  },
  {
    title: "Ex-showroom/Discount Section",
    dependent: true,
    conditions: [
      {
        field: "Any Change in Discount?",
        operator: "===",
        value: "Yes",
      },
    ],
    fields: [
      {
        name: "Ex-Showroom Price",
        icon: "123",
        type: "number",
        defaultValue: 0,
        validation: yup.number(),
        dependent: true,
      },
      {
        name: "Discount Amount",
        icon: "123",
        type: "number",
        defaultValue: 0,
        validation: yup.number(),
        dependent: true,
      },
      {
        name: "Reason for Change in Discount",
        icon: "question",
        type: "text",
        validation: yup.string(),
        dependent: true,
      },
    ],
  },
  {
    title: "Remarks Section",
    fields: [
      {
        name: "Remarks",
        icon: "sticky-fill",
        type: "text",
        placeholder: "",
        as: "textarea",
        size: 12,
        validation: yup.string(),
      },
    ],
  },
];

const fieldSectionIndexMap = sectionsMeta.reduce((map, section, idx) => {
  const fieldsMap = section.fields.reduce((fieldMap, fieldMeta) => {
    fieldMap[fieldMeta.name] = idx;
    return fieldMap;
  }, {});
  return { ...map, ...fieldsMap };
}, {});

const schemaModifier = (values, schema) => {
  console.log("Inside schemaModifier");
  const { "Case Type": caseType } = values[0];
  const { "Any Change in Discount?": anyDiscount } = values[0];
  let newSchema = schema;
  if (caseType === "Finance") {
    newSchema = schema.shape({
      "Finance Type": yup.string(),
      "Financier Name": yup.string(),
      "Financier Contact Number": yup.number(),
      "Finance Amount": yup.number(),
      "DO Upload": yup.string().url(),
    });
  }
  if (anyDiscount === "Yes") {
    newSchema = schema.shape({
      "Ex-Showroom Price": yup.number(),
      "Discount Amount": yup.number(),
      "Reason for Change in Discount": yup.string(),
    });
  }
  return newSchema;
};

export default sectionsMeta;
export { fieldSectionIndexMap, schemaModifier };
