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
                    optionItems={searchFieldOptions}
                    error={errors[data.name]}
                    value={values[data.name]}
                    touched={touched[data.name]}
                  />
                )) ||
                (!data.searchable && (
                  <FormField
                    key={data.name}
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

export default EntryForm;
