import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import Accordion from "react-bootstrap/Accordion";
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
import createSchemaObject from "../utils";

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
  "Enquiry Number",
  "Customer Name",
  "Contact Number",
  "Email Address",
  "Model",
  "Sales Person Name",
];

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
  const [searchParamsUsed, setSearchParamsUsed] = useState(false);
  const [searchFieldOptions, setSearchFieldOptions] = useState([]);

  console.log("EnquiryStatus Form", values);
  console.log("EnquiryStatus Form", errors);

  useEffect(() => {
    // set the search values
    fetchData(
      undefined && appConfig.forms.delivery.search.sheetName,
      undefined && appConfig.forms.delivery.search.headerRow
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
    if (!searchParamsUsed) {
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
              key={data.name}
              id={data.name}
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
              key={data.name}
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

const CustomerInfo = (props) => {
  const { appConfig, inputOptions } = useOutletContext();
  const [searchFieldOptions, setSearchFieldOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const searchFieldChangeHandler = (fieldName, fieldValue, optionItem) => {
    console.log(`${fieldName} is being set!`);
    const newValues = {};
    for (const fieldName of prefilledfieldNames) {
      if (fieldName in optionItem && !!optionItem[fieldName]) {
        newValues[fieldName] = optionItem[fieldName];
      }
    }
  };

  return (
    <FormCard
      initialValues={{}}
      title="Customer Information"
      submitHandler={console.log}
      //   validationSchema={schema}
    >
      <Form noValidate className="mb-5">
        <SearchFormField
          id="Search"
          name="Search"
          handleChange={searchFieldChangeHandler}
          optionItems={searchFieldOptions}
          value={searchValue}
        />
        <Button variant="success" className="mt-3 text-center" sm="12" disabled={isSubmitting}>
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
      </Form>
      <Accordion defaultActiveKey={["0", "1", "2"]} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header style={{ backgroundColor: "#031633 !important" }}>
            Enquiry
          </Accordion.Header>
          <Accordion.Body></Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header style={{ backgroundColor: "#031633 !important" }}>
            Booking
          </Accordion.Header>
          <Accordion.Body></Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header style={{ backgroundColor: "#031633 !important" }}>
            Delivery
          </Accordion.Header>
          <Accordion.Body></Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </FormCard>
  );
};

export default CustomerInfo;

