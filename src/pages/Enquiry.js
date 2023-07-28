import React from "react";
import { useOutletContext } from "react-router-dom";

import { Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useFormikContext } from "formik";
import * as yup from "yup";

import FormCard from "../components/UI/FormCard";
import FormField from "../components/UI/FormField";
import formFieldsMetadata from "../data/Enquiry";
import createSchemaObject from "../utils";

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

  const { inputOptions, appConfig } = useOutletContext();

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Row>
        {formFieldsMetadata.length &&
          formFieldsMetadata.map((data) => (
            <FormField
              key={data.id}
              {...data}
              required={appConfig.mandatoriness.enquiryForm[data.name] || false}
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
            <Spinner
              as="span"
              size="sm"
              animation="border"
              aria-hidden="true"
            />
          )}
          <span> {isSubmitting ? "Submitting..." : "Submit"} </span>
        </Button>
      </Row>
    </Form>
  );
};

const Enquiry = (props) => {
  const { location, appConfig, uriLocation, inputOptions } = useOutletContext();
  const schemaObject = createSchemaObject(
    formFieldsMetadata,
    appConfig.mandatoriness.enquiryForm,
    inputOptions
  );
  const schema = yup.object().shape(schemaObject);

  const initialValues = formFieldsMetadata.reduce((obj, formField) => {
    obj[formField.name] = formField.value || "";
    return obj;
  }, {});

  const submitHandler = (values, { setSubmitting, resetForm }) => {
    const payload = JSON.parse(JSON.stringify(values));
    const queryParams = new URLSearchParams({
      ...values,
      formType: "enquiry-status",
    });

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
        appConfig.forms.enquiry.spreadsheetUrl,
        appConfig.forms.enquiry.sheetName,
        appConfig.forms.enquiry.headerRow,
        payload
      );
  };

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
};

export default Enquiry;
