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
import formFieldsMetadata, { searchFieldsMeta } from "../data/TestDrive";
import createSchemaObject from '../utils';

async function fetchData(sheetName, headerRow) {
  const result = await new Promise((resolve, reject) => {
    window.google &&
      window.google.script.run
        .withSuccessHandler(resolve)
        .withFailureHandler(reject)
        .getSearchData(sheetName, headerRow);
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

  const { appConfig, inputOptions } = useOutletContext();
  const [searchFieldOptions, setSearchFieldOptions] = useState([]);

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

  const searchFieldChangeHandler = (fieldName, fieldValue, optionItem) => {
    console.log(`${fieldName} is being set!`);
    setValues({ ...values, [fieldName]: fieldValue });
    const newValues = {};
    for (const fieldName of prefilledfieldNames) {
      if (fieldName in optionItem && !!optionItem[fieldName]) {
        newValues[fieldName] = optionItem[fieldName];
      }
    }
    setValues({ ...values, ...newValues });
  };

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
              handleChange={searchFieldChangeHandler.bind(null, data.name)}
              optionItems={searchFieldOptions}
              error={errors[data.name]}
              value={values[data.name]}
              touched={touched[data.name]}
            />
          ))}
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
            <Spinner as="span" size="sm" animation="border" aria-hidden="true" />
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
  const schema = yup.object().shape(schemaObject);

  const initialValues = formFieldsMeta.reduce((obj, formField) => {
    obj[formField.name] = formField.value || "";
    return obj;
  }, {});

  const submitHandler = (values, { setSubmitting, resetForm }) => {
    const payload = JSON.parse(JSON.stringify(values));
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
        appConfig.forms.testDrive.sheetName,
        appConfig.forms.testDrive.headerRow,
        payload
      );
  };

  return (
    <FormCard
      initialValues={initialValues}
      title="Test Drive Form"
      submitHandler={submitHandler}
      validationSchema={schema}
      enableReinitialize
    >
      <EnquiryForm />
    </FormCard>
  );
};

export default TestDrive;
