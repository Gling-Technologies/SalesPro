import React, { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import * as yup from 'yup'

import ExitForm from "../components/forms/ExitForm";
import FormCard from "../components/UI/FormCard";
import { exitFormFieldsMetadata } from "../data/TestDrive";
import { createSchemaObject } from '../utils';


const ExitTestDrive = (props) => {
  const { location, appConfig, inputOptions } = useOutletContext();
  const formFieldsMeta = exitFormFieldsMetadata;
  const schemaObject = createSchemaObject(
    formFieldsMeta,
    appConfig.mandatoriness.testDriveExitForm,
    inputOptions
  );
  const schema = yup.object().shape(schemaObject);

  const initialValues = formFieldsMeta.reduce((obj, formField) => {
    obj[formField.name] = formField.defaultValue || "";
    return obj;
  }, {});

  const submitHandler = (values, { setSubmitting, resetForm }) => {
    const payload = JSON.parse(JSON.stringify(values));
    payload["Test Drive Type"] = "Exit";
    payload["Location"] = location;
    console.log("Form Payload", payload);
    submitData(
      appConfig.forms.testDriveExit.spreadsheetUrl,
      appConfig.forms.testDriveExit.sheetName,
      appConfig.forms.testDriveExit.headerRow,
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
          <Button className="px-5" variant="primary">
            Exit
          </Button>
          <Link to="/test-drive-entry">
            <Button className="px-5" variant="secondary">
              Entry
            </Button>
          </Link>
        </div>
        <ExitForm />
      </>
    </FormCard>
  );
};

export default ExitTestDrive;

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
