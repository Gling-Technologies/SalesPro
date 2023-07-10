import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import { Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useFormikContext } from "formik";

import FormCard from "../components/UI/FormCard";
import SearchFormField from "../components/UI/SearchFormField";
import FormField from "../components/UI/FormField";
import formFieldsMetadata from "../data/TestDrive";
import * as yup from "yup";


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

  const { config, appConfig, inputOptions } = useOutletContext();
  const [searchFieldOptions, setSearchFieldOptions] = useState([]);

  console.log(errors);
  console.log(values);

  useEffect(() => {
    // set the search values
    fetchData(
      appConfig.forms.enquiryStatus.sheetName,
      appConfig.forms.enquiryStatus.headerRow
    )
      .then((records) => {
        // console.log(records);
        setSearchFieldOptions(records);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [appConfig]);

  const searchFieldChangeHandler = (fieldName, fieldValue, optionsItem) => {
    console.log(`${fieldName} is being set!`);
    setValues({ ...values, [fieldName]: fieldValue });
    const newValues = {};
    for (const fieldName of prefilledfieldNames) {
      if (fieldName in optionsItem) {
        newValues[fieldName] = optionsItem[fieldName];
      }
    }
    setValues({ ...values, ...newValues });
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Row>
        <SearchFormField
          name="Enquiry Number"
          id="Enquiry Number"
          icon="person-fill"
          value={values["Enquiry Number"]}
          handleChange={searchFieldChangeHandler.bind(null, "Enquiry Number")}
          optionItems={searchFieldOptions}
          searchBy="Enquiry Number"
          error={errors["Enquiry Number"]}
        />
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
          <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
        </Button>
      </Row>
    </Form>
  );
};

const TestDrive = (props) => {
  const { location, config, appConfig } = useOutletContext();
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
    "Test Drive Vehicle": yup.string().required(),
    "Test Drive Type": yup.string().required(),
    "DL Number": yup.string().required(),
    "Odometer Reading": yup.string().required(),
    "Customer Feedback": yup.string().required(),
    "Approved By": yup.string().required(),
  });

  const initialValues = formFieldsMetadata.reduce((obj, formField) => {
    obj[formField.name] = formField.value || "";
    return obj;
  }, {});
  initialValues["Enquiry Number"] = [];

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
