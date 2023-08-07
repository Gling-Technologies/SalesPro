import { string, number } from "yup";


const sectionsMeta = [
  {
    title: "General",
    fields: [
      {
        id: "Enquiry Number",
        name: "Enquiry Number",
        icon: "person-fill",
        required: true,
        placeholder: "Enter a value...",
        typeahead: true,
        validation: string(),
      },
      {
        id: "Customer Name",
        name: "Customer Name",
        required: true,
        icon: "person-fill",
        placeholder: "Enter a value...",
        validation: string(),
        typeahead: true,
      },
      {
        id: "Contact Number",
        name: "Contact Number",
        required: true,
        icon: "telephone-fill",
        placeholder: "Enter a value...",
        typeahead: true,
        validation: string(),
      },
      {
        id: "Email Address",
        name: "Email Address",
        type: "email",
        required: true,
        icon: "envelope-at-fill",
        placeholder: "Enter a value...",
        disabled: true,
        validation: string().email(),
      },
      {
        id: "Billing Address",
        name: "Billing Address",
        type: "text",
        required: true,
        icon: "envelope-at-fill",
        placeholder: "Enter a value...",
        validation: string(),
      },
      {
        id: "Date of Birth",
        name: "Date of Birth",
        type: "date",
        required: true,
        icon: "envelope-at-fill",
        placeholder: "Enter a value...",
        validation: string().required(),
      },
    ],
  },
  {
    title: "KYC Section",
    fields: [
      {
        name: "PAN Number",
        icon: "123",
        type: "text",
        required: true,
        placeholder: "Enter a value...",
        maxLength: 10,
        validation: string().min(10).max(10),
      },
      {
        name: "PAN Card Upload",
        icon: "123",
        type: "file",
        required: true,
        validation: string(),
      },
      {
        name: "Aadhaar Number",
        icon: "hash",
        type: "file",
        required: true,
        placeholder: "Enter a value...",
        validation: string(),
      },
      {
        name: "GST Number",
        icon: "hash",
        type: "text",
        required: true,
        placeholder: "Enter a value...",
        validation: string(),
      },
    ],
  },
  {
    title: "Vehicle Section",
    fields: [
      {
        name: "Model Variant",
        icon: "hash",
        type: "text",
        required: true,
        placeholder: "Select a variant...",
        validation: string(),
      },
      {
        name: "Transmission Type",
        icon: "hash",
        type: "select",
        required: true,
        placeholder: "Select a variant...",
        validation: string(),
      },
      {
        name: "Vehicle Colour",
        icon: "hash",
        type: "text",
        required: true,
        placeholder: "Select a variant...",
        validation: string(),
      },
      {
        name: "Fuel Type",
        icon: "hash",
        type: "select",
        required: true,
        placeholder: "Select a variant...",
        validation: string(),
      },
      {
        name: "MFG Year",
        icon: "hash",
        type: "number",
        required: true,
        placeholder: "Select a variant...",
        validation: number(),
      },
    ],
  },
  {
    title: "Billing Section",
    fields: [
      {
        name: "Finance Type",
        icon: "hash",
        type: "select",
        placeholder: "",
        validation: string(),
      },
      {
        name: "Ex-Showroom Price",
        icon: "123",
        type: "number",
        placeholder: "",
        validation: number(),
      },
      {
        name: "Registration Type",
        icon: "hash",
        type: "select",
        required: true,
        placeholder: "",
        validation: string(),
      },
      {
        name: "Registration Charges",
        icon: "123",
        type: "number",
        required: true,
        placeholder: "",
        validation: number(),
      },
      {
        name: "Insurance Type",
        icon: "hash",
        type: "select",
        required: true,
        placeholder: "",
        validation: string(),
      },
      {
        name: "Insurance Amount",
        icon: "123",
        type: "number",
        required: true,
        placeholder: "",

        validation: number(),
      },
      {
        name: "Extended Warranty",
        icon: "hash",
        type: "select",
        required: true,
        placeholder: "",
        validation: string(),
      },
      {
        name: "Extended Warranty Charges",
        icon: "123",
        type: "number",
        required: true,
        placeholder: "",
        validation: number(),
      },
      {
        name: "RSA",
        icon: "hash",
        type: "select",
        required: true,
        placeholder: "",
        validation: string(),
      },
      {
        name: "RSA Charges",
        icon: "123",
        type: "number",
        required: true,
        placeholder: "",
        validation: number(),
      },
      {
        name: "Basic Kit Amount",
        icon: "123",
        type: "number",
        required: true,
        placeholder: "",
        validation: number(),
      },
      {
        name: "Accessories Amount",
        icon: "123",
        type: "number",
        required: true,
        placeholder: "",
        validation: number(),
      },
      {
        name: "Antirust/Teflon",
        icon: "123",
        type: "number",
        required: true,
        placeholder: "",
        validation: number(),
      },
      {
        name: "AMC",
        icon: "123",
        type: "number",
        required: true,
        placeholder: "",
        validation: number(),
      },
      {
        name: "Fastag",
        icon: "123",
        type: "number",
        required: true,
        placeholder: "",
        validation: number(),
      },
      {
        name: "HSRP/TRC",
        icon: "123",
        type: "number",
        required: true,
        placeholder: "",
        validation: number(),
      },
      {
        name: "Any Other Charges",
        icon: "123",
        type: "number",
        required: true,
        placeholder: "",
        validation: number(),
      },
    ],
  },
  {
    title: "Discount & Scheme Section",
    fields: [
      {
        name: "Corporate Discount Type",
        icon: "hash",
        type: "select",
        placeholder: "",
        validation: string(),
      },
      {
        name: "Corporate Discount",
        icon: "123",
        type: "number",
        required: true,
        placeholder: "",

        validation: number(),
      },
      {
        name: "Loyalty Discount",
        icon: "123",
        type: "number",
        required: true,
        placeholder: "",

        validation: number(),
      },
      {
        name: "Exchange Discount",
        icon: "123",
        type: "number",
        required: true,
        placeholder: "",

        validation: number(),
      },
      {
        name: "Retail Discount",
        icon: "123",
        type: "number",
        required: true,
        placeholder: "",
        validation: number(),
      },
      {
        name: "Dealer Discount",
        icon: "123",
        type: "number",
        required: true,
        placeholder: "",
        validation: number(),
      },
      {
        name: "Scheme Type",
        icon: "hash",
        type: "select",
        placeholder: "",
        validation: string(),
      },
      {
        name: "Any Other Discount",
        icon: "123",
        type: "number",
        required: true,
        placeholder: "",
        validation: number(),
      },
    ],
  },
  {
    title: "Booking Amount & Other Details",
    fields: [
      {
        name: "Booking Amount",
        icon: "hash",
        type: "number",
        required: true,
        placeholder: "",
        validation: number(),
      },
      {
        name: "Booking Payment Mode",
        icon: "hash",
        type: "select",
        required: true,
        placeholder: "",
        validation: string(),
      },
      {
        name: "Expected Delivery Date",
        icon: "hash",
        type: "date",
        required: true,
        placeholder: "",
        validation: string().transform((dateString) =>
          dateString.split("-").reverse().join("/")
        ),
      },
      {
        name: "Sales Person Name",
        icon: "hash",
        type: "text",
        placeholder: "",
        validation: string(),
      },
      {
        name: "Exchange Type",
        icon: "hash",
        type: "radio",
        required: true,
        placeholder: "",
        validation: string(),
        defaultValue: "Yes",
      },
    ],
  },
  {
    title: "Exchange Section",
    dependent: true,
    conditions: [
      {
        field: "Exchange Type",
        operator: "===",
        value: "Yes",
      },
    ],
    fields: [
      {
        name: "Registration Number",
        icon: "hash",
        type: "text",
        required: true,
        placeholder: "",
        validation: string(),
        dependent: true,
      },
      {
        name: "Model Description",
        icon: "hash",
        type: "text",
        required: true,
        placeholder: "",
        validation: string(),
        dependent: true,
      },
      {
        name: "MFG Year",
        icon: "hash",
        type: "number",
        required: true,
        placeholder: "",
        validation: number(),
        dependent: true,
      },
      {
        name: "Exchange Value",
        icon: "hash",
        type: "number",
        required: true,
        placeholder: "",
        validation: string(),
        dependent: true,
      },
      {
        name: "Old RC Upload",
        icon: "hash",
        type: "file",
        placeholder: "",
        validation: string(),
        dependent: true,
      },
      {
        name: "Others if any",
        icon: "hash",
        type: "text",
        required: true,
        placeholder: "",
        as: "textarea",
        size: 12,
        validation: string(),
        dependent: true,
      },
    ],
  },
  {
    title: "Common Section",
    fields: [
      {
        name: "Remarks If Any",
        icon: "hash",
        type: "text",
        required: true,
        placeholder: "",
        as: "textarea",
        size: 12,
        validation: string(),
      },
    ],
  },
];

const schemaModifier = (values, schema) => {
  const { "Any Change in Discount?": anyDiscount } = values[0];
  let newSchema = schema;
  if (anyDiscount === "Yes") {
    newSchema = schema.shape({
      "Registration Number": string(),
      "Model Description": string(),
      "MFG Year": number(),
      "Exchange Value": number(),
      "Old RC Upload": string(),
      "Others if any": string(),
    });
  }
  return newSchema;
};

const fieldSectionIndexMap = sectionsMeta.reduce((map, section, idx) => {
  const fieldsMap = section.fields.reduce((fieldMap, fieldMeta) => {
    fieldMap[fieldMeta.name] = idx;
    return fieldMap;
  }, {});
  return { ...map, ...fieldsMap};
}, {});

console.log(fieldSectionIndexMap);

export default sectionsMeta;
export { fieldSectionIndexMap, schemaModifier };
