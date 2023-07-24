import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import { Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useFormikContext } from "formik";
import * as yup from 'yup'

import FormCard from "../components/UI/FormCard";
import SearchFormField from "../components/UI/SearchFormField";
import FormField from "../components/UI/FormField";
import formFieldsMetadata, {
  searchFieldsMeta,
  schemaModifier,
} from "../data/TestDrive";
import {createSchemaObject, checkConditions, applyData } from '../utils';
import { dummySearchData } from "../data/Search";

async function fetchData(sheetName, headerRow) {
  const result = await new Promise((resolve, reject) => {
    window.google &&
      window.google.script.run
        .withSuccessHandler(resolve)
        .withFailureHandler(reject)
        .getSearchData(sheetName, headerRow);

    !window.google && resolve(dummySearchData);
  });
  return result;
}

const prefilledfieldNames = [
  "Enquiry Number",
  "Customer Name",
  "Contact Number",
  "Email Address",
  "Address",
  "Source of Enquiry",
  "Model",
  "Sales Person Name",
  "Customer Type",
  "Visit Type",
  "CRM ID",
  "Priority",
];

const EnquiryForm = (props) => {

  const [searchFieldOptions, setSearchFieldOptions] = useState([]);
  const { appConfig, inputOptions } = useOutletContext();

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    isSubmitting,
  } = useFormikContext();

  // const driveType = values["Test Drive Type"];
  // useEffect(() => {
  //   if (driveType === "Exit") {
  //     setValues((v) => ({...v, "Customer Feedback": ""}));
  //   } else if (driveType === "Entry") {
  //     setValues((v) => ({ ...v, "DL Number": "",  "Odometer Reading": ""}));
  //   }
  // }, [driveType, setValues]);

  useEffect(() => {
    // set the search values
    fetchData(
      appConfig.forms.testDrive.search.sheetName,
      appConfig.forms.testDrive.search.headerRow
    )
      .then((records) => {
       const filteredRecords = records.filter(
         (record) => "Enquiry Number" in record && !!record["Enquiry Number"]
       );
        console.log(filteredRecords);
        setSearchFieldOptions(filteredRecords);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [appConfig]);

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Row>
        {searchFieldsMeta.length &&
          searchFieldsMeta.map((data) => (
            <SearchFormField
              key={data.id}
              id={data.id}
              name={data.name}
              icon={data.icon}
              required={appConfig.mandatoriness.testDriveForm[data.name] || false}
              handleChange={applyData.bind(null, setValues)}
              optionItems={searchFieldOptions.filter((option) => true)}
              error={errors[data.name]}
              value={values[data.name]}
              touched={touched[data.name]}
            />
          ))}
        {formFieldsMetadata.length &&
          formFieldsMetadata.filter(data => checkConditions(data.conditions, values))
                            .map((data) => (
              <FormField
                key={data.id}
                {...data}
                required={appConfig.mandatoriness.testDriveForm[data.name] || false}
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

const TestDrive = (props) => {
  const { location, appConfig, inputOptions } = useOutletContext();
  const formFieldsMeta = [...searchFieldsMeta, ...formFieldsMetadata];
  const schemaObject = createSchemaObject(
    formFieldsMeta,
    appConfig.mandatoriness.testDriveForm,
    inputOptions
  );
  const schema = yup.object().shape(schemaObject).when(schemaModifier);

  const initialValues = formFieldsMeta.reduce((obj, formField) => {
    obj[formField.name] = formField.defaultValue || "";
    return obj;
  }, {});

  const submitHandler = (values, { setSubmitting, resetForm }) => {
    const payload = JSON.parse(JSON.stringify(values));
    const driveType = payload["Test Drive Type"];
    if (driveType === "Exit") {
      payload["Customer Feedback"] = "";
    } else if (driveType === "Entry") {
      payload["DL Number"] = "";
      payload["Odometer Reading"] = "";
    }
    payload["Location"] = location;
    console.log("Form Payload", payload);
    submitData(
      appConfig.forms.testDrive.sheetName,
      appConfig.forms.testDrive.headerRow,
      payload,
      setSubmitting,
      resetForm
    );
  };

  return (
    <FormCard
      // noFormik={true}
      title="Test Drive Form"
      initialValues={initialValues}
      submitHandler={submitHandler}
      validationSchema={schema}
      enableReinitialize
    >
      <EnquiryForm />
    </FormCard>
  );
};

export default TestDrive;

const submitData = (
  sheetName,
  headerRow,
  payload,
  setSubmitting,
  resetForm
) => {
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
    .insertData(sheetName, headerRow, payload);
};
