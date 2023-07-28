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
import FormSection from '../components/UI/FormSection';
import sectionsMeta, { fieldSectionIndexMap } from "../data/Booking";
import { createSchemaObject, applyData } from '../utils';
import { dummySearchData } from "../data/Search";


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
    setSubmitting
  } = useFormikContext();

  const { inputOptions, appConfig } = useOutletContext();
  const [searchFieldOptions, setSearchFieldOptions] = useState([]);
  const [activeSection, setActiveSection] = useState(0);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  useEffect(() => {
    // set the search values
    fetchData(
      appConfig.forms.booking.search.spreadSheetUrl,
      appConfig.forms.booking.search.sheetName,
      appConfig.forms.booking.search.headerRow
    )
      .then((records) => {
        const filteredRecords = records.filter(
          (record) => "Enquiry Number" in record && !!record["Enquiry Number"]
        );
        setSearchFieldOptions(filteredRecords);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [appConfig]);

  useEffect(() => {
    if(isFormSubmitted === true){
      const errorFields = Object.keys(errors);
      if(errorFields.length > 0) {
        const sectionIndex = fieldSectionIndexMap[errorFields[0]];
        setActiveSection(sectionIndex);
      }
      setIsFormSubmitted(false);
    }
  }, [isFormSubmitted, errors]);

  const submitHandler = (...rest) => {
    handleSubmit(...rest);
    setIsFormSubmitted(true);
  }

  return (
    <Form noValidate onSubmit={submitHandler}>
      <Row>
        <Accordion
          activeKey={activeSection}
          onSelect={(eventKey, event) => setActiveSection(eventKey)}
        >
          {sectionsMeta.length &&
            sectionsMeta.map((sectionMeta, idx) => (
              <FormSection key={idx} id={idx} title={sectionMeta.title}>
                <Row>
                  {sectionMeta.fields.map(
                    (data) =>
                      (!!data.searchable && (
                        <SearchFormField
                          key={data.name}
                          id={data.name}
                          name={data.name}
                          required={
                            appConfig.mandatoriness.bookingForm[data.name] ||
                            false
                          }
                          icon={data.icon}
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
    obj[formField.name] = formField.defaultValue || "";
    return obj;
  }, {});

  const submitHandler = (values, { setSubmitting, resetForm }) => {
    const payload = JSON.parse(JSON.stringify(values));
    const deliveryDate = payload["Expected Delivery Date"];
    if (deliveryDate && /^[\d]{4}-[\d]{2}-[\d]{2}$/.test(deliveryDate)) {
      payload["Expected Delivery Date"] = deliveryDate.split("-").reverse().join("/");
    }
    payload["Location"] = location;
    console.log("Form Payload", payload);
    submitData(
      appConfig.forms.booking.spreadSheetUrl,
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
