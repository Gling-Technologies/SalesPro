import React, { useState, useEffect } from 'react'
import { useOutletContext } from "react-router-dom";

import { Row } from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useFormikContext } from "formik";
import * as yup from 'yup';

import FormCard from "../components/UI/FormCard";
import SearchFormField from "../components/UI/SearchFormField";
import FormField from "../components/UI/FormField";
import formFieldsMetadata, { searchFieldsMeta } from "../data/EnquiryStatus";
import { applyData, createSchemaObject} from '../utils';
import { dummySearchData } from '../data/Search'


async function fetchData(spreadSheetUrl, sheetName, headerRow) {
  const result = await new Promise((resolve, reject) => {
    window.google &&
      window.google.script.run
        .withSuccessHandler(resolve)
        .withFailureHandler(reject)
        .getSearchData(spreadSheetUrl, sheetName, headerRow);

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

  const { inputOptions, appConfig } = useOutletContext();
  const [searchParamsUsed, setSearchParamsUsed] = useState(false);
  const [searchFieldOptions, setSearchFieldOptions] = useState([]);

  console.log("EnquiryStatus Form", values);
  console.log("EnquiryStatus Form", errors);

  useEffect(() => {
    // set the search values
    fetchData(
      appConfig.forms.enquiryStatus.search.spreadSheetUrl,
      appConfig.forms.enquiryStatus.search.sheetName,
      appConfig.forms.enquiryStatus.search.headerRow
    )
      .then((records) => {
        const filteredRecords = records.filter(
          (record) => "Enquiry Number" in record && !!record["Enquiry Number"]
        );
        // console.log(filteredRecords);
        setSearchFieldOptions(filteredRecords);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [appConfig]);

  useEffect(() => {
    if(!searchParamsUsed){
      window.google &&
        window.google.script.url.getLocation(function (location) {
          const newValues = {};
          for (const fieldName of prefilledfieldNames) {
            if (fieldName in location.parameters) {
              newValues[fieldName] = location.parameters[fieldName][0];
            }
          }
          setSearchParamsUsed(true);
          setValues({ ...values, ...newValues });
        });
    }
  }, [searchParamsUsed, values, setValues]);

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
              required={appConfig.mandatoriness.enquiryStatusForm[data.name] || false}
              handleChange={applyData.bind(null, setValues)}
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
              required={appConfig.mandatoriness.enquiryStatusForm[data.name] || false}
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
}


const EnquiryStatus = (props) => {
  const { location, appConfig, inputOptions } = useOutletContext();
  const formFieldsMeta = [...searchFieldsMeta, ...formFieldsMetadata];
  const schemaObject = createSchemaObject(
    formFieldsMeta,
    appConfig.mandatoriness.enquiryStatusForm,
    inputOptions
  );
  const schema = yup.object().shape(schemaObject);

  const initialValues = formFieldsMeta.reduce((obj, formField) => {
    obj[formField.name] = formField.value || "";
    return obj;
  }, {});

  const submitHandler = (values, { setSubmitting, resetForm }) => {
    const payload = JSON.parse(JSON.stringify(values));
    const followUpDate = payload["Next Follow Up Date"];
    if (followUpDate && /^[\d]{4}-[\d]{2}-[\d]{2}$/.test(followUpDate)) {
      payload["Next Follow Up Date"] = followUpDate.split("-").reverse().join("/");
    }
    payload["Location"] = location;
    console.log("Form Payload", payload);
    submitData(
      appConfig.forms.enquiryStatus.spreadSheetUrl,
      appConfig.forms.enquiryStatus.sheetName,
      appConfig.forms.enquiryStatus.headerRow,
      payload,
      setSubmitting,
      resetForm
    );
  };

  return (
    <FormCard
      initialValues={initialValues}
      title="Enquiry Status Form"
      submitHandler={submitHandler}
      validationSchema={schema}
    >
      <EnquiryForm />
    </FormCard>
  );
};

export default EnquiryStatus;


const submitData = (
  spreadSheetUrl,
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
    .insertData(spreadSheetUrl, sheetName, headerRow, payload);
};
