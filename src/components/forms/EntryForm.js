import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import { Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useFormikContext } from "formik";
import * as yup from "yup";

import SearchFormField from "../UI/SearchFormField";
import FormField from "../UI/FormField";
import { entryFormFieldsMetadata } from "../../data/TestDrive";
import { checkConditions, applyData } from "../../utils";
import { dummySearchData } from "../../data/Search";

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
          (record) =>
            "Test Drive Number" in record && !!record["Test Drive Number"]
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
        <SearchFormField
          id={"Test Drive Number"}
          name={"Test Drive Number"}
          icon={entryFormFieldsMetadata[0].icon}
          required={
            appConfig.mandatoriness.testDriveEntryForm["Test Drive Number"] ||
            false
          }
          placeholder={entryFormFieldsMetadata[0].placeholder}
          handleChange={applyData.bind(null, setValues)}
          optionItems={searchFieldOptions}
          error={errors["Test Drive Number"]}
          value={values["Test Drive Number"]}
          touched={touched["Test Drive Number"]}
        />
        <FormField
          {...entryFormFieldsMetadata[1]}
          required={
            appConfig.mandatoriness.testDriveEntryForm["Customer Name"] || false
          }
          value={values["Customer Name"]}
          touched={touched["Customer Name"]}
          error={errors["Customer Name"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Customer Name"]}
        />
        <FormField
          {...entryFormFieldsMetadata[2]}
          required={
            appConfig.mandatoriness.testDriveEntryForm["Contact Number"] ||
            false
          }
          value={values["Contact Number"]}
          touched={touched["Contact Number"]}
          error={errors["Contact Number"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Contact Number"]}
        />
        <FormField
          {...entryFormFieldsMetadata[3]}
          required={
            appConfig.mandatoriness.testDriveEntryForm["Email Address"] || false
          }
          value={values["Email Address"]}
          touched={touched["Email Address"]}
          error={errors["Email Address"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Email Address"]}
        />
        <FormField
          {...entryFormFieldsMetadata[4]}
          required={
            appConfig.mandatoriness.testDriveEntryForm["Address"] || false
          }
          value={values["Address"]}
          touched={touched["Address"]}
          error={errors["Address"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Address"]}
        />
        <FormField
          {...entryFormFieldsMetadata[5]}
          required={
            appConfig.mandatoriness.testDriveEntryForm["Source of Enquiry"] ||
            false
          }
          value={values["Source of Enquiry"]}
          touched={touched["Source of Enquiry"]}
          error={errors["Source of Enquiry"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Source of Enquiry"]}
        />
        <FormField
          {...entryFormFieldsMetadata[6]}
          required={
            appConfig.mandatoriness.testDriveEntryForm["Model"] || false
          }
          value={values["Model"]}
          touched={touched["Model"]}
          error={errors["Model"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Model"]}
        />
        <FormField
          {...entryFormFieldsMetadata[7]}
          required={
            appConfig.mandatoriness.testDriveEntryForm["Sales Person Name"] ||
            false
          }
          value={values["Sales Person Name"]}
          touched={touched["Sales Person Name"]}
          error={errors["Sales Person Name"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Sales Person Name"]}
        />
        <FormField
          {...entryFormFieldsMetadata[8]}
          required={
            appConfig.mandatoriness.testDriveEntryForm["Test Drive Vehicle"] ||
            false
          }
          value={values["Test Drive Vehicle"]}
          touched={touched["Test Drive Vehicle"]}
          error={errors["Test Drive Vehicle"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Test Drive Vehicle"]}
        />
        <FormField
          {...entryFormFieldsMetadata[9]}
          required={
            appConfig.mandatoriness.testDriveEntryForm["Odometer Reading"] ||
            false
          }
          value={values["Odometer Reading"]}
          touched={touched["Odometer Reading"]}
          error={errors["Odometer Reading"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Odometer Reading"]}
        />
        <FormField
          {...entryFormFieldsMetadata[10]}
          required={
            appConfig.mandatoriness.testDriveEntryForm["Customer Feedback"] ||
            false
          }
          value={values["Customer Feedback"]}
          touched={touched["Customer Feedback"]}
          error={errors["Customer Feedback"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Customer Feedback"]}
        />
        <FormField
          {...entryFormFieldsMetadata[11]}
          required={
            appConfig.mandatoriness.testDriveEntryForm["Customer Remarks"] ||
            false
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

export default EntryForm;
