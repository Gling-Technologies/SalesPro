import React, { useState, useEffect } from 'react'
import { useOutletContext } from "react-router-dom";

import { Row } from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useFormikContext } from "formik";
import * as yup from "yup";


import FormCard from "../components/UI/FormCard";
import FormField from "../components/UI/FormField";
import formFieldsMetadata from '../data/Enquiry';


const EnquiryForm = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormikContext();

  const { inputOptions } = useOutletContext();

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Row>
        {formFieldsMetadata.length &&
          formFieldsMetadata.map((data) => (
            <FormField
              key={data.id}
              {...data}
              value={values[data.name]}
              touched={touched[data.name]}
              error={errors[data.name]}
              handleChange={handleChange}
              onBlur={handleBlur}
              optionItems={inputOptions[data.name]}
            />
          ))}
        <Button
          variant="primary"
          type="submit"
          className="mt-3"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <Spinner as="span" animation="border" aria-hidden="true" />
          )}
          <span> {isSubmitting ? "Submitting..." : "Submit"} </span>
        </Button>
      </Row>
    </Form>
  );
}


const Enquiry = (props) => {
  const { location, appConfig, inputOptions, uriLocation } = useOutletContext();
  const schema = yup.object().shape({
    "Customer Name": yup.string().required(),
    "Contact Number": yup
      .string()
      .required()
      .matches(
        /^[0-9]{10}$/,
        "Mobile number is not valid! Enter 10 digits number."
      ),
    "Email Address": appConfig.mandatoriness.enquiryForm.EmailAddress
      ? yup.string().required().email()
      : yup.string().email(),
    Address: yup.string().required(),
    "Source of Enquiry": yup.string().required(),
    Model: yup.string().required(),
    "Sales Person Name": yup.string().required(),
    "Customer Remarks": yup.string().required(),
  });

  const initialValues = formFieldsMetadata.reduce((obj, formField) => {
    obj[formField.name] = formField.value || "";
    return obj;
  }, {})

  const submitHandler = (values, { setSubmitting, resetForm }) => {
    const payload = JSON.parse(JSON.stringify(values));
    const queryParams = new URLSearchParams(values);
    payload["Enquiry Status Form"] = `${uriLocation}?${queryParams.toString()}`;
    payload["Location"] = location;
    console.log("Form Payload", payload);

    setSubmitting(true);
    window.google.script.run
      .withSuccessHandler((result) => {
        console.log(result);
        resetForm();
        setSubmitting(false);
      })
      .withFailureHandler((err) => {
        console.error(err);
        setSubmitting(false);
      })
      .insertData(
        appConfig.forms.enquiry.sheetName,
        appConfig.forms.enquiry.headerRow,
        payload
      );
  }

  return (
    <FormCard
      initialValues={initialValues}
      title="Enquiry Form"
      submitHandler={submitHandler}
      validationSchema={schema}
    >
      <EnquiryForm />
    </FormCard>
  );
}

export default Enquiry;
