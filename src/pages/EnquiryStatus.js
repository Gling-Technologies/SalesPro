import React, { useState, useEffect } from 'react'
import { useOutletContext, useSearchParams } from "react-router-dom";

import { Row } from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useFormikContext } from "formik";

import FormCard from "../components/UI/FormCard";
import SearchFormField from "../components/UI/SearchFormField";
import FormField from "../components/UI/FormField";
import formFieldsMetadata from '../data/EnquiryStatus';
import * as yup from "yup";


async function fetchData() {
  const result = await new Promise((resolve, reject) => {
    global.config.google.script.run
      .withSuccessHandler(resolve)
      .withFailureHandler(reject)
      .getConfiguration();
  });
  return result;
}


const searchFieldOptions = [
  { id: 1, name: "John" },
  { id: 2, name: "Miles" },
  { id: 3, name: "Charles" },
  { id: 4, name: "Herbie" },
];


const EnquiryForm = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setValues,
    isSubmitting,
    submitCount,
  } = useFormikContext();

  const { inputOptions } = useOutletContext();
  const [searchParamsUsed, setSearchParamsUsed] = useState(false);

  console.log("EnquiryStatus Form", values);

  useEffect(() => {
    // set the input values
    // fetchData()
    //   .then((newData) => {
    //     console.log(newData);
    //     if (!newData) return;
    //     for (const field in newData) {
    //       setFieldValue(field, newData[field]);
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });

    if(!searchParamsUsed){
      window.google &&
        window.google.script.url.getLocation(function (location) {
          const fieldNames = [
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
          const newValues = {};
          for (const fieldName of fieldNames) {
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
        <SearchFormField
          name="Enquiry Number"
          id="Enquiry Number"
          icon="person-fill"
          handleChange={(newValue) => {
            console.log("Enquiry No is being set!");
            setFieldValue("Enquiry Number", newValue);
          }}
          options={searchFieldOptions}
          searchBy="Enquiry Number"
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
          {isSubmitting && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
          <span>{isSubmitting ? "Submiting..." : "Submit"}</span>
        </Button>
      </Row>
    </Form>
  );
}


const EnquiryStatus = (props) => {
  const [fieldOptions, setFieldOptions] = useState({});
  const { location, config } = useOutletContext();
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

  useEffect(() => {
    const allInputOptionsEl = document.getElementById("all-input-options");
    let allInputOptions = allInputOptionsEl.dataset.inputOptions;
    setFieldOptions(JSON.parse(allInputOptions));
  }, []);

  const initialValues = formFieldsMetadata.reduce((obj, formField) => {
    obj[formField.name] = formField.value || "";
    return obj;
  }, {});
  initialValues["Enquiry Number"] = "";

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
        config.forms.enquiryStatus.sheetName,
        config.forms.enquiryStatus.headerRow,
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
