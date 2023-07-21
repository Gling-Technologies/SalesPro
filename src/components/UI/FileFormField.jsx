import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

async function uploadFile(sheetName, headerRow) {
  const result = await new Promise((resolve, reject) => {
    window.google &&
      window.google.script.run
        .withSuccessHandler(resolve)
        .withFailureHandler(reject)
        .uploadFile(sheetName, headerRow);
  });
  return result;
}


const FileFormField = (props) => {

  const [fileInputValue, setFileInputValue] = useState();

  const changeHandler = (e) => {
    setFileInputValue(e.target.value);
    props.handleChange("https://localhost/" + Date.now());
  };

  return (
    <Form.Group
      as={Col}
      sm="12"
      xs="12"
      md={6}
      controlId={props.name + "__controlId"}
    >
      <Form.Label>{props.name}</Form.Label>
      <InputGroup className="mb-3" hasValidation>
        <Form.Control
          type="file"
          name={props.name}
          required={props.required || false}
          isInvalid={props.touched && !!props.error}
          placeholder={props.placeholder}
          value={fileInputValue}
          onChange={changeHandler}
        />
        <Form.Control.Feedback type="invalid">
          {props.error}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
}

export default FileFormField;