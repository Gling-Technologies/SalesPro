import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import { Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useFormikContext } from "formik";

import SearchFormField from "../UI/SearchFormField";
import FormField from "../UI/FormField";
import { exitFormFieldsMetadata } from "../../data/TestDrive";
import { createSchemaObject, checkConditions, applyData } from "../../utils";
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
        <SearchFormField
          id={"Enquiry Number"}
          name={"Enquiry Number"}
          icon={exitFormFieldsMetadata[0].icon}
          required={
            appConfig.mandatoriness.testDriveExitForm["Enquiry Number"] || false
          }
          placeholder={exitFormFieldsMetadata[0].placeholder}
          handleChange={applyData.bind(null, setValues)}
          optionItems={searchFieldOptions}
          error={errors["Enquiry Number"]}
          value={values["Enquiry Number"]}
          touched={touched["Enquiry Number"]}
        />
        <SearchFormField
          id={"Customer Name"}
          name={"Customer Name"}
          icon={exitFormFieldsMetadata[1].icon}
          required={
            appConfig.mandatoriness.testDriveExitForm["Customer Name"] || false
          }
          placeholder={exitFormFieldsMetadata[1].placeholder}
          handleChange={applyData.bind(null, setValues)}
          optionItems={searchFieldOptions}
          error={errors["Customer Name"]}
          value={values["Customer Name"]}
          touched={touched["Customer Name"]}
        />
        <SearchFormField
          id={"Contact Number"}
          name={"Contact Number"}
          icon={exitFormFieldsMetadata[2].icon}
          required={
            appConfig.mandatoriness.testDriveExitForm["Contact Number"] || false
          }
          placeholder={exitFormFieldsMetadata[2].placeholder}
          handleChange={applyData.bind(null, setValues)}
          optionItems={searchFieldOptions}
          error={errors["Contact Number"]}
          value={values["Contact Number"]}
          touched={touched["Contact Number"]}
        />
        <FormField
          {...exitFormFieldsMetadata[3]}
          required={
            appConfig.mandatoriness.testDriveExitForm["Email Address"] || false
          }
          value={values["Email Address"]}
          touched={touched["Email Address"]}
          error={errors["Email Address"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Email Address"]}
        />
        <FormField
          {...exitFormFieldsMetadata[4]}
          required={
            appConfig.mandatoriness.testDriveExitForm["Address"] || false
          }
          value={values["Address"]}
          touched={touched["Address"]}
          error={errors["Address"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Address"]}
        />
        <FormField
          {...exitFormFieldsMetadata[5]}
          required={
            appConfig.mandatoriness.testDriveExitForm["Source of Enquiry"] ||
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
          {...exitFormFieldsMetadata[6]}
          required={appConfig.mandatoriness.testDriveExitForm["Model"] || false}
          value={values["Model"]}
          touched={touched["Model"]}
          error={errors["Model"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Model"]}
        />
        <FormField
          {...exitFormFieldsMetadata[7]}
          required={
            appConfig.mandatoriness.testDriveExitForm["Sales Person Name"] ||
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
          {...exitFormFieldsMetadata[8]}
          required={
            appConfig.mandatoriness.testDriveExitForm["Test Drive Vehicle"] ||
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
          {...exitFormFieldsMetadata[9]}
          required={
            appConfig.mandatoriness.testDriveExitForm["DL Number"] || false
          }
          value={values["DL Number"]}
          touched={touched["DL Number"]}
          error={errors["DL Number"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["DL Number"]}
        />
        <FormField
          {...exitFormFieldsMetadata[10]}
          required={
            appConfig.mandatoriness.testDriveExitForm["Odometer Reading"] ||
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
          {...exitFormFieldsMetadata[11]}
          required={
            appConfig.mandatoriness.testDriveExitForm["Approved By"] || false
          }
          value={values["Approved By"]}
          touched={touched["Approved By"]}
          error={errors["Approved By"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Approved By"]}
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

export default ExitForm;