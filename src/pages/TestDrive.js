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
  } = useFormikContext();

  const { inputOptions } = useOutletContext();
  const [searchParamsUsed, setSearchParamsUsed] = useState(false);

  console.log(errors);
  console.log(values);

  React.useEffect(() => {
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
  }, [setFieldValue]);

  useEffect(() => {
    if (!searchParamsUsed){
      window.google &&
        window.google.script.url.getLocation(function (location) {
          const fieldNames = [
            "Enquiry No.",
            "Customer Name",
            "Contact Number",
            "Email Address",
            "Address",
            "Source of Enquiry",
            "Model",
            "Sales Person Name",
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
          name="Enquiry No."
          id="Enquiry No."
          icon="person-fill"
          // value={values["Enquiry No."]}
          // onChange={handleChange}
          options={searchFieldOptions}
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
          <span>{isSubmitting ? "Submiting..." : "Submit"}</span>
        </Button>
      </Row>
    </Form>
  );
};

const TestDrive = (props) => {
  const { location, config } = useOutletContext();
  const schema = yup.object().shape({
    "Enquiry No.": yup.string().required(),
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
  initialValues["Enquiry No."] = [];

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
        config.forms.testDrive.sheetName,
        config.forms.testDrive.headerRow,
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
