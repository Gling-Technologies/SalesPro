import React, { useState, useEffect } from 'react'
import { useOutletContext } from "react-router-dom";

import { Row } from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useFormikContext } from "formik";


import FormCard from "../components/UI/FormCard";
import FormField from "../components/UI/FormField";
import formFieldsMetadata from '../data/Enquiry';
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

const EnquiryForm = (props) => {
  const [fieldOptions, setFieldOptions] = useState({});
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    isSubmitting,
    submitCount,
  } = useFormikContext();

  console.log(errors);

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
      const allInputOptionsEl = document.getElementById("all-input-options");
      let allInputOptions = allInputOptionsEl.dataset.inputOptions;
      setFieldOptions(JSON.parse(allInputOptions));
    }, []);

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Row>
        {formFieldsMetadata.length &&
          formFieldsMetadata.map((data) => (
            <FormField
              key={data.id}
              {...data}
              value={values[data.name]}
              touched={touched[data.name]}
              error={errors[data.name]}
              onChange={handleChange}
              onBlur={handleBlur}
              optionItems={fieldOptions[data.name]}
            />
          ))}
        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Row>
    </Form>
  );
}


const Enquiry = (props) => {
  const { location } = useOutletContext();
  const schema = yup.object().shape({
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
    "Visit Type": yup.string().oneOf([])
  });

  const initialValues = formFieldsMetadata.reduce((obj, formField) => {
    obj[formField.name] = formField.value || "";
    return obj;
  }, {})

  const submitHandler = (values, { setSubmitting }) => {
    console.log("Form Values", values);
    const payload = JSON.parse(JSON.stringify(values));
    payload["Location"] = location;
    window.google.script.run
      .withSuccessHandler(result => {
        console.log(result)
        setSubmitting(false);
      })
      .withFailureHandler(err => {
        console.error(err);
      })
      .insertData();
  }

  const validator = (values) => {
    const errors = {};
    errors["Customer Name"] = "This field is required!";
    console.log("validating...")
    return errors;
  }

  return (
    <FormCard
      initialValues={initialValues}
      title="Enquiry Form"
      submitHandler={submitHandler}
      // validate={validator}
      validationSchema={schema}
    >
      <EnquiryForm />
    </FormCard>
  );
}

export default Enquiry;
