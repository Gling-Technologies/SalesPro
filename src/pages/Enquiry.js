import React from 'react'
import { useOutletContext } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import * as formik from "formik";
import FormField from '../components/UI/FormField';
import { Row } from 'react-bootstrap';
// import * as yup from "yup";


const formFieldsMetadata = [
  {
    id: "Customer Name",
    name: "Customer Name",
    type: "text",
    required: true,
    icon: "person-fill",
    placeholder: "Enter a value...",
  },
  {
    id: "Contact Number",
    name: "Contact Number",
    type: "tel",
    required: true,
    icon: "person-fill",
    placeholder: "Enter a value...",
  },
  {
    id: "Email Address",
    name: "Email Address",
    type: "email",
    required: true,
    icon: "person-fill",
    placeholder: "Enter a value...",
  },
  {
    id: "Address",
    name: "Address",
    type: "text",
    required: true,
    icon: "person-fill",
    placeholder: "Enter a value...",
  },
  {
    id: "Source of Enquiry",
    name: "Source of Enquiry",
    type: "text",
    required: true,
    icon: "person-fill",
    placeholder: "Enter a value...",
  },
  {
    id: "Model",
    name: "Model",
    type: "text",
    required: true,
    icon: "person-fill",
    placeholder: "Enter a value...",
  },
  {
    id: "Sales Person Name",
    name: "Sales Person Name",
    type: "text",
    required: true,
    icon: "person-fill",
    placeholder: "Enter a value...",
  },
  {
    id: "Customer Remarks",
    name: "Customer Remarks",
    type: "text",
    required: true,
    icon: "person-fill",
    placeholder: "Enter a value...",
  },
];

const Enquiry = (props) => {
  const { Formik } = formik;
  const { location } = useOutletContext();

  // const schema = yup.object().shape({
  //   customerName: yup.string().required(),
  //   contactNumber: yup.string().required(),
  //   emailAddress: yup.string().required(),
  //   sourceOfEnquiry: yup.string().required(),
  //   model: yup.string().required(),
  //   salesPersonName: yup.string().required(),
  //   customerRemarks: yup.bool().required().oneOf([true], "Terms must be accepted"),
  // });

  return (
    <Formik
      // validationSchema={schema}
      onSubmit={console.log}
      initialValues={formFieldsMetadata.reduce((obj, formField) => {
        obj[formField.name] = formField.value || null;
        return obj;
      }, {})}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit}>
          <p>{location}</p>
          <Row>
            {formFieldsMetadata.length && formFieldsMetadata.map(data => <FormField key={data.id} {...data} />)}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Row>
        </Form>
      )}
    </Formik>
  );
}

export default Enquiry