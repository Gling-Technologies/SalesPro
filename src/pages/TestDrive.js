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
import {
  entryFormFieldsMetadata,
  exitFormFieldsMetadata,
} from "../data/TestDrive";
import { createSchemaObject, checkConditions, applyData } from '../utils';
import { dummySearchData } from "../data/Search";

async function fetchData(spreadsheetUrl, sheetName, headerRow) {
  const result = await new Promise((resolve, reject) => {
    window.google &&
      window.google.script.run
        .withSuccessHandler(resolve)
        .withFailureHandler(reject)
        .getSearchData(spreadsheetUrl, sheetName, headerRow);

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

const EntryForm = (props) => {

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

  useEffect(() => {
    // set the search values
    fetchData(
      appConfig.forms.testDriveEntry.search.spreadsheetUrl,
      appConfig.forms.testDriveEntry.search.sheetName,
      appConfig.forms.testDriveEntry.search.headerRow
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
        {entryFormFieldsMetadata.length &&
          entryFormFieldsMetadata
            .filter((data) => checkConditions(data.conditions, values))
            .map(
              (data) =>
                (!!data.searchable && (
                  <SearchFormField
                    key={data.name}
                    id={data.name}
                    name={data.name}
                    icon={data.icon}
                    required={
                      appConfig.mandatoriness.testDriveEntryForm[data.name] ||
                      false
                    }
                    handleChange={applyData.bind(null, setValues)}
                    optionItems={searchFieldOptions.filter((option) => true)}
                    error={errors[data.name]}
                    value={values[data.name]}
                    touched={touched[data.name]}
                  />
                )) ||
                (!data.searchable && (
                  <FormField
                    key={data.id}
                    {...data}
                    required={
                      appConfig.mandatoriness.testDriveEntryForm[data.name] ||
                      false
                    }
                    value={values[data.name]}
                    touched={touched[data.name]}
                    error={errors[data.name]}
                    handleChange={handleChange}
                    onBlur={handleBlur}
                    optionItems={inputOptions[data.name]}
                  />
                ))
            )}
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


const ExitForm = (props) => {
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

  useEffect(() => {
    // set the search values
    fetchData(
      appConfig.forms.testDriveExit.search.spreadsheetUrl,
      appConfig.forms.testDriveExit.search.sheetName,
      appConfig.forms.testDriveExit.search.headerRow
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
        {exitFormFieldsMetadata.length &&
          exitFormFieldsMetadata
            .filter((data) => checkConditions(data.conditions, values))
            .map(
              (data) =>
                (!!data.searchable && (
                  <SearchFormField
                    key={data.name}
                    id={data.name}
                    name={data.name}
                    icon={data.icon}
                    required={
                      appConfig.mandatoriness.testDriveExitForm[data.name] ||
                      false
                    }
                    handleChange={applyData.bind(null, setValues)}
                    optionItems={searchFieldOptions.filter((option) => true)}
                    error={errors[data.name]}
                    value={values[data.name]}
                    touched={touched[data.name]}
                  />
                )) ||
                (!data.searchable && (
                  <FormField
                    key={data.id}
                    {...data}
                    required={
                      appConfig.mandatoriness.testDriveExitForm[data.name] ||
                      false
                    }
                    value={values[data.name]}
                    touched={touched[data.name]}
                    error={errors[data.name]}
                    handleChange={handleChange}
                    onBlur={handleBlur}
                    optionItems={inputOptions[data.name]}
                  />
                ))
            )}
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
  const [isEntering, setIsEntering] = useState(false)
  const { location, appConfig, inputOptions } = useOutletContext();
  const formFieldsMeta = isEntering ? entryFormFieldsMetadata: exitFormFieldsMetadata;
  const schemaObject = createSchemaObject(
    formFieldsMeta,
    isEntering
      ? appConfig.mandatoriness.testDriveEntryForm
      : appConfig.mandatoriness.testDriveExitForm,
    inputOptions
  );
  const schema = yup.object().shape(schemaObject);

  const initialValues = formFieldsMeta.reduce((obj, formField) => {
    obj[formField.name] = formField.defaultValue || "";
    return obj;
  }, {});

  const submitHandler = (values, { setSubmitting, resetForm }) => {
    const payload = JSON.parse(JSON.stringify(values));
    payload["Test Drive Type"] = isEntering ? "Entry" : "Exit";
    payload["Location"] = location;
    console.log("Form Payload", payload);
    submitData(
      isEntering
        ? appConfig.forms.testDriveEntry.spreadsheetUrl
        : appConfig.forms.testDriveExit.spreadsheetUrl,
      isEntering
        ? appConfig.forms.testDriveEntry.sheetName
        : appConfig.forms.testDriveExit.sheetName,
      isEntering
        ? appConfig.forms.testDriveEntry.headerRow
        : appConfig.forms.testDriveExit.headerRow,
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
      <>
        <div className="d-flex justify-content-between mb-4">
          <Button className="px-5" variant={isEntering ? "primary" : "secondary"} onClick={() => setIsEntering(true)}>
            Entry
          </Button>
          <Button className="px-5" variant={!isEntering ? "primary" : "secondary"} onClick={() => setIsEntering(false)}>
            Exit
          </Button>
        </div>
        {isEntering ? <EntryForm /> : <ExitForm />}
      </>
    </FormCard>
  );
};

export default TestDrive;

const submitData = (
  spreadsheetUrl,
  sheetName,
  headerRow,
  payload,
  setSubmitting,
  resetForm
) => {
  setSubmitting(true);
  window.google.script.run
    .withSuccessHandler((result) => {
      console.log("insertData", result);
      resetForm();
      setSubmitting(false);
    })
    .withFailureHandler((err) => {
      console.error(err);
      setSubmitting(false);
    })
    .insertData(spreadsheetUrl, sheetName, headerRow, payload);
};
