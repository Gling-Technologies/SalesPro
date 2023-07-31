import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import Accordion from "react-bootstrap/Accordion";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import { Typeahead } from "react-bootstrap-typeahead";

import FormCard from "../components/UI/FormCard";
import SelectInput from "../components/UI/SelectInput";
import { dummyCustomerInfo, dummySearchData } from "../data/Search";


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

async function fetchCustomerInfo(customerInfo, sourceInfo) {
  const result = await new Promise((resolve, reject) => {
    window.google &&
      window.google.script.run
        .withSuccessHandler(resolve)
        .withFailureHandler(reject)
        .getCustomerInfo(customerInfo, sourceInfo);

    !window.google && resolve(dummyCustomerInfo);
  });
  return result;
}


const CustomerInfo = (props) => {
  const { appConfig } = useOutletContext();
  const [searchFieldOptions, setSearchFieldOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerData, setCustomerData] = useState({});

  useEffect(() => {
    // set the search values
    fetchData(
      appConfig.forms.customerInfo.search.spreadsheetUrl,
      appConfig.forms.customerInfo.search.sheetName,
      appConfig.forms.customerInfo.search.headerRow
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

  const optionRenderer = (option) => {

    if (!option["Enquiry Number"] ){
      return "";
    }
    return `${option["Enquiry Number"]} | ${option["Customer Name"]} | ${option["Contact Number"]} | ${option["Sales Person Name"]}`;
  };

  const submitHandler = async () => {
    if (selected.length === 0) return;

    setIsSubmitting(true);
    try {
      const response = await fetchCustomerInfo(
        selected[0],
        appConfig.forms.customerInfo
      );
      if(response.success === true){
        console.log(response);
        setCustomerData(response);
      }
      setIsSubmitting(false);

    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  const filterByFields = ["Enquiry Number", "Customer Name", "Contact Number"];
  const filterByCallback = (option, props) => {
    return (
      option["Enquiry Number"]
        .toLowerCase()
        .indexOf(props.text.toLowerCase()) !== -1 ||
      option["Customer Name"]
        .toLowerCase()
        .indexOf(props.text.toLowerCase()) !== -1 ||
      option["Contact Number"]
        .toLowerCase()
        .indexOf(props.text.toLowerCase()) !== -1
    );
  }

  const searchOptionItems = ["Enquiry Number", "Customer Name", "Contact Number", "Sales Person Name"]

  return (
    <FormCard
      initialValues={{}}
      title="Customer Info"
      submitHandler={console.log}
      //   validationSchema={schema}
    >
      <>
        <Form noValidate className="mb-5">
          <Row>
            <SelectInput size="4" name="Search In" optionItems={searchOptionItems} />
            <Col xs="12" sm="12" md="8">
              <Form.Group className="mb-3">
                <Form.Label htmlFor="customer-search">Search</Form.Label>
                <Typeahead
                  id="customer-search"
                  minLength={3}
                  // filterBy={filterByFields}
                  labelKey={optionRenderer}
                  onChange={setSelected}
                  options={searchFieldOptions}
                  placeholder={"Type here..."}
                  selected={selected}
                  paginate={true}
                  // renderMenuItemChildren={optionRenderer}
                />
                <Form.Control.Feedback type="invalid">
                  {props.error}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Button
            variant="success"
            className="mt-3"
            sm="12"
            disabled={isSubmitting}
            onClick={submitHandler}
          >
            {isSubmitting && (
              <Spinner as="span" size="sm" animation="border" />
            )}
            <span> {isSubmitting ? "Searching..." : "Submit"} </span>
          </Button>
        </Form>
        <Accordion defaultActiveKey={["0", "1", "2"]} alwaysOpen>
          <Accordion.Item eventKey="0" className="mb-3">
            <Accordion.Header style={{ backgroundColor: "#031633 !important" }}>
              Enquiry
            </Accordion.Header>
            <Accordion.Body style={{ overflow: "scroll" }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    {appConfig.forms.customerInfo.enquiry.headers &&
                      appConfig.forms.customerInfo.enquiry.headers.map(
                        (header, idx) => <th key={idx}>{header}</th>
                      )}
                  </tr>
                </thead>
                <tbody>
                  {customerData.enquiry &&
                    customerData.enquiry.map((row, rowIdx) => (
                      <tr key={rowIdx}>
                        {row.map((cellValue, cellIdx) => (
                          <td key={cellIdx}>{cellValue}</td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </Table>
              {!customerData.enquiry && (
                <p className="text-center text-info">
                  No information available!
                </p>
              )}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1" className="mb-3">
            <Accordion.Header style={{ backgroundColor: "#031633 !important" }}>
              Booking
            </Accordion.Header>
            <Accordion.Body style={{ overflow: "scroll" }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    {appConfig.forms.customerInfo.booking.headers &&
                      appConfig.forms.customerInfo.booking.headers.map(
                        (header, idx) => <th key={idx}>{header}</th>
                      )}
                  </tr>
                </thead>
                <tbody>
                  {customerData.booking &&
                    customerData.booking.map((row, rowIdx) => (
                      <tr key={rowIdx}>
                        {row.map((cellValue, cellIdx) => (
                          <td key={cellIdx}>{cellValue}</td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </Table>
              {!customerData.booking && (
                <p className="text-center text-info">
                  No information available!
                </p>
              )}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2" className="mb-3">
            <Accordion.Header style={{ backgroundColor: "#031633 !important" }}>
              Delivery
            </Accordion.Header>
            <Accordion.Body style={{ overflow: "scroll" }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    {appConfig.forms.customerInfo.delivery.headers &&
                      appConfig.forms.customerInfo.delivery.headers.map(
                        (header, idx) => <th key={idx}>{header}</th>
                      )}
                  </tr>
                </thead>
                <tbody>
                  {customerData.delivery &&
                    customerData.delivery.map((row, rowIdx) => (
                      <tr key={rowIdx}>
                        {row.map((cellValue, cellIdx) => (
                          <td key={cellIdx}>{cellValue}</td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </Table>
              {!customerData.delivery && (
                <p className="text-center text-info">
                  No information available!
                </p>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </>
    </FormCard>
  );
};

export default React.memo(CustomerInfo);

