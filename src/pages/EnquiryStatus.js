import React, { useState, useEffect } from 'react'
import { useOutletContext } from "react-router-dom";

import { Row } from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useFormikContext } from "formik";
import * as yup from "yup";

import FormCard from "../components/UI/FormCard";
import SearchFormField from "../components/UI/SearchFormField";
import FormField from "../components/UI/FormField";
import formFieldsMetadata, { searchFieldsMeta } from "../data/EnquiryStatus";


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
      appConfig.forms.enquiry.sheetName,
      appConfig.forms.enquiry.headerRow
    )
      .then((records) => {
        // console.log(records);
        setSearchFieldOptions(records);
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

  const searchFieldChangeHandler = (fieldName, fieldValue, optionItem) => {
    console.log(`${fieldName} is being set!`);
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
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
          <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
        </Button>
      </Row>
    </Form>
  );
}


const EnquiryStatus = (props) => {
  const { location, appConfig } = useOutletContext();
  const schema = yup.object().shape({
    "Enquiry Number": yup.string().required(),
    "Customer Name": yup.string().required(),
    "Contact Number": yup
      .string()
      .required()
      .matches(
        /^[0-9]{10}$/,
        "Mobile number is not valid! Enter 10 digits number."
      ),
    "Email Address": yup.string().required().email(),
    Address: yup.string().required(),
    "Source of Enquiry": yup.string().required(),
    Model: yup.string().required(),
    "Sales Person Name": yup.string().required(),
    "Customer Remarks": yup.string().required(),
    "Customer Type": yup.string().required(),
    "Visit Type": yup.string().required(),
    "CRM ID": yup.string().required(),
    "Enquiry Status": yup.string().required(),
    "Next Follow Up Date": yup.string().required(),
    Priority: yup.string().required(),
    // "Visit Type": yup.string().oneOf(fieldOptions["Visit Type"]),
  });

  let initialValues = formFieldsMetadata.reduce((obj, formField) => {
    obj[formField.name] = formField.value || "";
    return obj;
  }, {});
  initialValues = searchFieldsMeta.reduce((obj, formField) => {
    obj[formField.name] = formField.value || "";
    return obj;
  }, initialValues);

  const submitHandler = (values, { setSubmitting }) => {
    const payload = JSON.parse(JSON.stringify(values));
    payload["Location"] = location;
    console.log("Form Payload", payload);

    setSubmitting(true);
    window.google.script.run
      .withSuccessHandler((result) => {
        console.log(result);
        setSubmitting(false);
      })
      .withFailureHandler((err) => {
        console.error(err);
        setSubmitting(false);
      })
      .insertData(
        appConfig.forms.enquiryStatus.sheetName,
        appConfig.forms.enquiryStatus.headerRow,
        payload
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
