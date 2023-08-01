import React, { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";

import { Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useFormikContext } from "formik";
import * as yup from 'yup'

import EntryForm from "../components/forms/EntryForm";
import ExitForm from "../components/forms/ExitForm";
import FormCard from "../components/UI/FormCard";
import {
  entryFormFieldsMetadata,
  exitFormFieldsMetadata,
} from "../data/TestDrive";
import { createSchemaObject } from '../utils';
import { dummySearchData } from "../data/Search";


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


const EntryTestDrive = (props) => {
  const { location, appConfig, inputOptions } = useOutletContext();
  const formFieldsMeta = entryFormFieldsMetadata
  const schemaObject = createSchemaObject(
    formFieldsMeta,
    appConfig.mandatoriness.testDriveEntryForm,
    inputOptions
  );
  const schema = yup.object().shape(schemaObject);

  const initialValues = formFieldsMeta.reduce((obj, formField) => {
    obj[formField.name] = formField.defaultValue || "";
    return obj;
  }, {});

  const submitHandler = (values, { setSubmitting, resetForm }) => {
    const payload = JSON.parse(JSON.stringify(values));
    payload["Test Drive Type"] = "Entry";
    payload["Location"] = location;
    console.log("Form Payload", payload);
    submitData(
      appConfig.forms.testDriveEntry.spreadsheetUrl,
      appConfig.forms.testDriveEntry.sheetName,
      appConfig.forms.testDriveEntry.headerRow,
      payload,
      setSubmitting,
      resetForm
    );
  };

  let title = "Test Drive Form";
  if (appConfig.companyNamePrefix) {
    title = `${appConfig.companyNamePrefix} ${title}`;
  }
  if (appConfig.companyNameSuffix) {
    title = `${title} ${appConfig.companyNameSuffix}`;
  }
  return (
    <FormCard
      // noFormik={true}
      title={title}
      initialValues={initialValues}
      submitHandler={submitHandler}
      validationSchema={schema}
      enableReinitialize
    >
      <>
        <div className="d-flex justify-content-between mb-4">
          <Link to="/test-drive-exit">
            <Button className="px-5" variant="secondary">
              Exit
            </Button>
          </Link>
          <Button className="px-5" variant="primary">
            Entry
          </Button>
        </div>
        <EntryForm />
      </>
    </FormCard>
  );
};

export default EntryTestDrive;

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
