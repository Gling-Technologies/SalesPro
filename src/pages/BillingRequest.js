import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import { Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useFormikContext } from "formik";
import * as yup from "yup";

import FormCard from "../components/UI/FormCard";
import SearchFormField from "../components/UI/SearchFormField";
import FormField from "../components/UI/FormField";
import formFieldsMetadata, { searchFieldsMeta } from "../data/Delivery";
import { createSchemaObject, applyData } from "../utils";
import { dummySearchData } from "../data/Search";

async function fetchData(sheetName, headerRow) {
  const result = await new Promise((resolve, reject) => {
    window.google &&
      window.google.script.run
        .withSuccessHandler(resolve)
        .withFailureHandler(reject)
        .getSearchData(sheetName, headerRow);

    !window.google && resolve(dummySearchData);
  });
  return result;
}

const DeliveryForm = (props) => {
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
  const [searchFieldOptions, setSearchFieldOptions] = useState([]);

  useEffect(() => {
    // set the search values
    fetchData(
      appConfig.forms.delivery.search.sheetName,
      appConfig.forms.delivery.search.headerRow
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

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Row>
        {searchFieldsMeta.length &&
          searchFieldsMeta.map((data) => (
            <SearchFormField
              key={data.name}
              id={data.name}
              name={data.name}
              icon={data.icon}
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
              key={data.name}
              {...data}
              required={
                appConfig.mandatoriness.deliveryForm[data.name] || false
              }
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
};

const BillingRequest = (props) => {
  const { location, appConfig, inputOptions } = useOutletContext();
  const formFieldsMeta = [...searchFieldsMeta, ...formFieldsMetadata];
  const schemaObject = createSchemaObject(
    formFieldsMeta,
    appConfig.mandatoriness.deliveryForm,
    inputOptions
  );
  const schema = yup.object().shape(schemaObject);

  const initialValues = formFieldsMeta.reduce((obj, formField) => {
    obj[formField.name] = formField.value || "";
    return obj;
  }, {});

  const submitHandler = (values, { setSubmitting, resetForm }) => {
    const payload = JSON.parse(JSON.stringify(values));
    const deliveryDate = payload['Delivery Date'];
    if (deliveryDate && /^[\d]{4}-[\d]{2}-[\d]{2}$/.test(deliveryDate)) {
      payload["Delivery Date"] = deliveryDate.split("-").reverse().join("/");
    }
    payload["Location"] = location;
    console.log("Form Payload", payload);
    submitData(
      appConfig.forms.delivery.sheetName,
      appConfig.forms.delivery.headerRow,
      payload,
      setSubmitting,
      resetForm
    );
  };

  return (
    <FormCard
      initialValues={initialValues}
      title="Billing Request Form"
      submitHandler={submitHandler}
      validationSchema={schema}
    >
      <DeliveryForm />
    </FormCard>
  );
};

export default BillingRequest;

const submitData = (
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
    .insertData(sheetName, headerRow, payload);
};
