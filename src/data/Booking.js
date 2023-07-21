import { string, number, date, addMethod } from "yup";
import moment from "moment";


addMethod(date, "format", function format(formats, parseStrict) {
  return this.transform((value, originalValue, ctx) => {
    if (ctx.isType(value)) return value;

    value = moment(originalValue, formats, parseStrict);

    return value.isValid() ? value.toDate() : new Date("");
  });
});

const sectionsMeta = [
  {
    title: "General",
    fields: [
      {
        id: "Enquiry Number",
        name: "Enquiry Number",
        icon: "person-fill",
        required: true,
        placeholder: "Pick a number...",
        searchable: true,
        validation: string(),
      },
      {
        id: "Customer Name",
        name: "Customer Name",
        required: true,
        icon: "person-fill",
        placeholder: "Enter a value...",
        searchable: true,
        validation: string(),
      },
      {
        id: "Contact Number",
        name: "Contact Number",
        required: true,
        icon: "telephone-fill",
        placeholder: "Enter a value...",
        searchable: true,
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
        placeholder: "Pick a number...",
        maxLength: 10,
        validation: string().min(10).max(10),
      },
      {
        name: "Aadhaar Number",
        icon: "hash",
        type: "file",
        required: true,
        placeholder: "Pick a number...",
        validation: string().length(12),
      },
      {
        name: "GST Number",
        icon: "hash",
        type: "text",
        required: true,
        placeholder: "Pick a number...",
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
        type: "select",
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
        type: "select",
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
        name: "Ex-Showroom Price",
        icon: "hash",
        type: "number",
        required: true,
        placeholder: "",
        validation: number(),
      },
      {
        name: "Registration Type",
        icon: "hash",
        type: "radio",
        required: true,
        placeholder: "",
        validation: string(),
      },
      {
        name: "Registration Charges",
        icon: "hash",
        type: "number",
        required: true,
        placeholder: "",
        validation: number(),
      },
      {
        name: "Insurance",
        icon: "hash",
        type: "select",
        required: true,
        placeholder: "",
        validation: string(),
      },
      {
        name: "Insurance Amount",
        icon: "hash",
        type: "number",
        required: true,
        placeholder: "",
        validation: number(),
      },
      {
        name: "Extended Warranty",
        icon: "hash",
        type: "radio",
        required: true,
        placeholder: "",
        validation: string(),
      },
      {
        name: "Extended Warranty Charges",
        icon: "hash",
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
        icon: "hash",
        type: "number",
        required: true,
        placeholder: "",
        validation: number(),
      },
      {
        name: "Basic Kit Amount",
        icon: "hash",
        type: "number",
        required: true,
        placeholder: "",
        validation: number(),
      },
      {
        name: "Accessories Amount",
        icon: "hash",
        type: "number",
        required: true,
        placeholder: "",
        validation: number(),
      },
      {
        name: "Any Other Charges",
        icon: "hash",
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
        name: "Corporate Discount",
        icon: "hash",
        type: "number",
        required: true,
        placeholder: "",
        validation: number(),
      },
      {
        name: "Loyalty Discount",
        icon: "hash",
        type: "number",
        required: true,
        placeholder: "",
        validation: number(),
      },
      {
        name: "Exchange Discount",
        icon: "hash",
        type: "number",
        required: true,
        placeholder: "",
        validation: number(),
      },
      {
        name: "Retail Discount",
        icon: "hash",
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
        validation: number(),
      },
      {
        name: "Expected Delivery Date",
        icon: "hash",
        type: "date",
        required: true,
        placeholder: "",
        // validation: string().transform((dateString) => dateString.split("-").reverse().join("/")),
        validation: string().format("dd/mm/yy"),
      },
      {
        name: "Sales Person Name",
        icon: "hash",
        type: "select",
        required: true,
        placeholder: "",
        validation: number(),
      },
      {
        name: "Exchange Type",
        icon: "hash",
        type: "radio",
        required: true,
        placeholder: "",
        validation: string(),
        default: "Yes",
      },
    ],
  },
  {
    title: "Exchange Section",
    fields: [
      {
        name: "Registration No.",
        icon: "hash",
        type: "text",
        required: true,
        placeholder: "",
        validation: string(),
      },
      {
        name: "Model Description",
        icon: "hash",
        type: "text",
        required: true,
        placeholder: "",
        validation: string(),
      },
      {
        name: "MFG Year",
        icon: "hash",
        type: "number",
        required: true,
        placeholder: "",
        validation: number(),
      },
      {
        name: "Exchange Value Approved by Tata OK",
        icon: "hash",
        type: "number",
        required: true,
        placeholder: "",
        validation: string(),
      },
      {
        name: "Exchange Checklist",
        icon: "hash",
        type: "checklist",
        required: true,
        placeholder: "",
        validation: string(),
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
        validation: string(),
      },
    ],
  },
];

export default sectionsMeta;
