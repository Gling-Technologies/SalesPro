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
import formFieldsMetadata, {
  searchFieldsMeta,
  schemaModifier,
} from "../data/EnquiryStatus";
import { applyData, checkConditions, createSchemaObject} from '../utils';
import { dummySearchData } from '../data/Search'


async function fetchData(spreadsheetUrl, sheetName, headerRow) {
  const result = await new Promise((resolve, reject) => {
    window.google &&
      window.google.script.run
        .withSuccessHandler(resolve)
        .withFailureHandler(reject)
        .getSearchData(spreadsheetUrl, sheetName, headerRow);

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

const excludedFields = [
  "Enquiry Status",
  "Next Follow Up Date",
  "Customer Remarks",
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
      appConfig.forms.enquiryStatus.search.spreadsheetUrl,
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
        <SearchFormField
          id="Enquiry Number"
          name="Enquiry Number"
          icon={searchFieldsMeta[0].icon}
          required={
            appConfig.mandatoriness.enquiryStatusForm["Enquiry Number"] || false
          }
          placeholder={searchFieldsMeta[0].placeholder}
          handleChange={(x) => applyData(setValues, x, excludedFields)}
          optionItems={searchFieldOptions}
          error={errors["Enquiry Number"]}
          value={values["Enquiry Number"]}
          touched={touched["Enquiry Number"]}
        />
        <SearchFormField
          id="Customer Name"
          name="Customer Name"
          icon={searchFieldsMeta[1].icon}
          required={
            appConfig.mandatoriness.enquiryStatusForm["Customer Name"] || false
          }
          placeholder={searchFieldsMeta[0].placeholder}
          handleChange={(x) => applyData(setValues, x, excludedFields)}
          optionItems={searchFieldOptions}
          error={errors["Customer Name"]}
          value={values["Customer Name"]}
          touched={touched["Customer Name"]}
        />
        <SearchFormField
          id="Contact Number"
          name="Contact Number"
          icon={searchFieldsMeta[2].icon}
          required={
            appConfig.mandatoriness.enquiryStatusForm["Contact Number"] || false
          }
          placeholder={searchFieldsMeta[0].placeholder}
          handleChange={(x) => applyData(setValues, x, excludedFields)}
          optionItems={searchFieldOptions}
          error={errors["Contact Number"]}
          value={values["Contact Number"]}
          touched={touched["Contact Number"]}
        />
        <FormField
          key={"Email Address"}
          {...formFieldsMetadata[0]}
          required={
            appConfig.mandatoriness.enquiryStatusForm["Email Address"] || false
          }
          value={values["Email Address"]}
          touched={touched["Email Address"]}
          error={errors["Email Address"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Email Address"]}
        />
        <FormField
          key={"Address"}
          {...formFieldsMetadata[1]}
          required={
            appConfig.mandatoriness.enquiryStatusForm["Address"] || false
          }
          value={values["Address"]}
          touched={touched["Address"]}
          error={errors["Address"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Address"]}
        />
        <FormField
          key={"Source of Enquiry"}
          {...formFieldsMetadata[2]}
          required={
            appConfig.mandatoriness.enquiryStatusForm["Source of Enquiry"] ||
            false
          }
          value={values["Source of Enquiry"]}
          touched={touched["Source of Enquiry"]}
          error={errors["Source of Enquiry"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Source of Enquiry"]}
        />
        <FormField
          key={"Model"}
          {...formFieldsMetadata[3]}
          required={appConfig.mandatoriness.enquiryStatusForm["Model"] || false}
          value={values["Model"]}
          touched={touched["Model"]}
          error={errors["Model"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Model"]}
        />
        <FormField
          key={"Sales Person Name"}
          {...formFieldsMetadata[4]}
          required={
            appConfig.mandatoriness.enquiryStatusForm["Sales Person Name"] ||
            false
          }
          value={values["Sales Person Name"]}
          touched={touched["Sales Person Name"]}
          error={errors["Sales Person Name"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Sales Person Name"]}
        />
        <FormField
          key={"Customer Type"}
          {...formFieldsMetadata[5]}
          required={
            appConfig.mandatoriness.enquiryStatusForm["Customer Type"] || false
          }
          value={values["Customer Type"]}
          touched={touched["Customer Type"]}
          error={errors["Customer Type"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Customer Type"]}
        />
        <FormField
          key={"Visit Type"}
          {...formFieldsMetadata[6]}
          required={
            appConfig.mandatoriness.enquiryStatusForm["Visit Type"] || false
          }
          value={values["Visit Type"]}
          touched={touched["Visit Type"]}
          error={errors["Visit Type"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Visit Type"]}
        />
        <FormField
          key={"CRM ID"}
          {...formFieldsMetadata[7]}
          required={
            appConfig.mandatoriness.enquiryStatusForm["CRM ID"] || false
          }
          value={values["CRM ID"]}
          touched={touched["CRM ID"]}
          error={errors["CRM ID"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["CRM ID"]}
        />
        <FormField
          key={"Enquiry Status"}
          {...formFieldsMetadata[8]}
          required={
            appConfig.mandatoriness.enquiryStatusForm["Enquiry Status"] || false
          }
          value={values["Enquiry Status"]}
          touched={touched["Enquiry Status"]}
          error={errors["Enquiry Status"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Enquiry Status"]}
        />
        <FormField
          key={"Priority"}
          {...formFieldsMetadata[9]}
          required={
            appConfig.mandatoriness.enquiryStatusForm["Priority"] || false
          }
          value={values["Priority"]}
          touched={touched["Priority"]}
          error={errors["Priority"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Priority"]}
        />
        {checkConditions(formFieldsMetadata[10].conditions, values) && (
          <FormField
            key={"Next Follow Up Date"}
            {...formFieldsMetadata[10]}
            required={
              appConfig.mandatoriness.enquiryStatusForm[
                "Next Follow Up Date"
              ] || false
            }
            value={values["Next Follow Up Date"]}
            touched={touched["Next Follow Up Date"]}
            error={errors["Next Follow Up Date"]}
            handleChange={handleChange}
            onBlur={handleBlur}
            optionItems={inputOptions["Next Follow Up Date"]}
          />
        )}
        {checkConditions(formFieldsMetadata[11].conditions, values) && (
          <FormField
            key={"Lost Reason"}
            {...formFieldsMetadata[11]}
            required={
              appConfig.mandatoriness.enquiryStatusForm["Lost Reason"] || false
            }
            value={values["Lost Reason"]}
            touched={touched["Lost Reason"]}
            error={errors["Lost Reason"]}
            handleChange={handleChange}
            onBlur={handleBlur}
            optionItems={inputOptions["Lost Reason"]}
          />
        )}
        {checkConditions(formFieldsMetadata[12].conditions, values) && (
          <FormField
            key={"Lost Sub Reason"}
            {...formFieldsMetadata[12]}
            required={
              appConfig.mandatoriness.enquiryStatusForm["Lost Sub Reason"] ||
              false
            }
            value={values["Lost Sub Reason"]}
            touched={touched["Lost Sub Reason"]}
            error={errors["Lost Sub Reason"]}
            handleChange={handleChange}
            onBlur={handleBlur}
            optionItems={inputOptions["Lost Sub Reason"]}
          />
        )}
        <FormField
          key={"Customer Remarks"}
          {...formFieldsMetadata[13]}
          required={
            appConfig.mandatoriness.enquiryStatusForm["Customer Remarks"] ||
            false
          }
          value={values["Customer Remarks"]}
          touched={touched["Customer Remarks"]}
          error={errors["Customer Remarks"]}
          handleChange={handleChange}
          onBlur={handleBlur}
          optionItems={inputOptions["Customer Remarks"]}
        />
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
  const schema = yup.object().shape(schemaObject).when(schemaModifier);

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
      appConfig.forms.enquiryStatus.spreadsheetUrl,
      appConfig.forms.enquiryStatus.sheetName,
      appConfig.forms.enquiryStatus.headerRow,
      payload,
      setSubmitting,
      resetForm
    );
  };

  let title = "Enquiry Status Form";
  if (appConfig.companyNamePrefix) {
    title = `${appConfig.companyNamePrefix} ${title}`;
  }
  if (appConfig.companyNameSuffix) {
    title = `${title} ${appConfig.companyNameSuffix}`;
  }
  return (
    <FormCard
      initialValues={initialValues}
      title={title}
      submitHandler={submitHandler}
      validationSchema={schema}
    >
      <EnquiryForm />
    </FormCard>
  );
};

export default EnquiryStatus;


const submitData = (
  spreadsheetUrl,
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
    .insertData(spreadsheetUrl, sheetName, headerRow, payload);
};
