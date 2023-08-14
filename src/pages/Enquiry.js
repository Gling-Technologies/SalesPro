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
        <FormField
          {...formFieldsMetadata[0]}
          required={
            appConfig.mandatoriness.enquiryForm["Customer Name"] || false
          }
          value={values["Customer Name"]}
          touched={touched["Customer Name"]}
          error={errors["Customer Name"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Customer Name"]}
        />
        <FormField
          {...formFieldsMetadata[1]}
          required={
            appConfig.mandatoriness.enquiryForm["Contact Number"] || false
          }
          value={values["Contact Number"]}
          touched={touched["Contact Number"]}
          error={errors["Contact Number"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Contact Number"]}
        />
        <FormField
          {...formFieldsMetadata[2]}
          required={
            appConfig.mandatoriness.enquiryForm["Email Address"] || false
          }
          value={values["Email Address"]}
          touched={touched["Email Address"]}
          error={errors["Email Address"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Email Address"]}
        />
        <FormField
          {...formFieldsMetadata[3]}
          required={appConfig.mandatoriness.enquiryForm["Address"] || false}
          value={values["Address"]}
          touched={touched["Address"]}
          error={errors["Address"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Address"]}
        />
        <FormField
          {...formFieldsMetadata[4]}
          required={
            appConfig.mandatoriness.enquiryForm["Source of Enquiry"] || false
          }
          value={values["Source of Enquiry"]}
          touched={touched["Source of Enquiry"]}
          error={errors["Source of Enquiry"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Source of Enquiry"]}
        />
        <FormField
          {...formFieldsMetadata[5]}
          required={appConfig.mandatoriness.enquiryForm["Model"] || false}
          value={values["Model"]}
          touched={touched["Model"]}
          error={errors["Model"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Model"]}
        />
        <FormField
          {...formFieldsMetadata[6]}
          required={
            appConfig.mandatoriness.enquiryForm["Sales Person Name"] || false
          }
          value={values["Sales Person Name"]}
          touched={touched["Sales Person Name"]}
          error={errors["Sales Person Name"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Sales Person Name"]}
        />
        <FormField
          {...formFieldsMetadata[7]}
          required={
            appConfig.mandatoriness.enquiryForm["Customer Remarks"] || false
          }
          value={values["Customer Remarks"]}
          touched={touched["Customer Remarks"]}
          error={errors["Customer Remarks"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Customer Remarks"]}
        />
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

  let title = "Enquiry Form";
  if (appConfig.companyNamePrefix) {
    title = `${appConfig.companyNamePrefix} ${title}`;
  }
  if (appConfig.companyNameSuffix) {
    title = `${title} ${appConfig.companyNameSuffix}`;
  }
  return (
    <FormCard
      initialValues={initialValues}
      title={title}
      submitHandler={submitHandler}
      validationSchema={schema}
    >
      <EnquiryForm />
    </FormCard>
  );
};

export default Enquiry;
