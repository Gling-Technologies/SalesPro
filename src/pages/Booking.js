import React, { useState, useEffect } from 'react'
import { useOutletContext } from "react-router-dom";

import { Row } from 'react-bootstrap';
import Accordion from "react-bootstrap/Accordion";
import Tabs from 'react-bootstrap/Tabs';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useFormikContext } from "formik";
import * as yup from 'yup';

import FormCard from "../components/UI/FormCard";
import SearchFormField from "../components/UI/SearchFormField";
import FormField from "../components/UI/FormField";
import sectionsMeta from "../data/Booking";
import createSchemaObject from '../utils';
import FormSection from '../components/UI/FormSection';


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

const submitData = (sheetName, headerRow, payload, setSubmitting, resetForm) => {
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

const prefilledfieldNames = [
  "Enquiry Number",
  "Customer Name",
  "Contact Number",
  "Email Address",
];

const BookingForm = (props) => {
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
      appConfig.forms.booking.search.sheetName,
      appConfig.forms.booking.search.headerRow
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

  console.log(values);
  // if(errors)
  // const accordionActiveKey =  errors[""] || 0

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Row>
        <Accordion defaultActiveKey={0}>
          {/* <Tabs defaultActiveKey={0} activeKey={key} onSelect={(k) => setKey(k)} fill> */}
          {sectionsMeta.length &&
            sectionsMeta.map((sectionMeta, idx) => (
              <FormSection key={idx} id={idx} title={sectionMeta.title}>
                <Row>
                  {sectionMeta.fields.map(
                    (data) =>
                      (!!data.searchable && (
                        <SearchFormField
                          key={data.id}
                          id={data.id}
                          name={data.name}
                          icon={data.icon}
                          handleChange={searchFieldChangeHandler.bind(
                            null,
                            data.name
                          )}
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
                            appConfig.mandatoriness.bookingForm[data.name] ||
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
                </Row>
              </FormSection>
            ))}
        </Accordion>
        {/* </Tabs> */}
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


const Booking = (props) => {
  const { location, appConfig, inputOptions } = useOutletContext();
  const formFieldsMeta = sectionsMeta.map((sectionMeta) => sectionMeta.fields).flat();
  const schemaObject = createSchemaObject(
    formFieldsMeta,
    appConfig.mandatoriness.bookingForm || {},
    inputOptions
  );
  const schema = yup.object().shape(schemaObject);

  const initialValues = formFieldsMeta.reduce((obj, formField) => {
    obj[formField.name] = formField.value || "";
    return obj;
  }, {});

  const submitHandler = (values, { setSubmitting, resetForm }) => {
    const payload = JSON.parse(JSON.stringify(values));
    payload["Location"] = location;
    console.log("Form Payload", payload);
    submitData(
      appConfig.forms.booking.sheetName,
      appConfig.forms.booking.headerRow,
      payload,
      setSubmitting,
      resetForm
    );
  };

  return (
    <FormCard
      initialValues={initialValues}
      title="Booking Form"
      submitHandler={submitHandler}
      validationSchema={schema}
    >
      <BookingForm />
    </FormCard>
  );
};

export default Booking;
