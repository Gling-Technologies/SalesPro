import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
// import Toast from "react-bootstrap/Toast";
// import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

async function saveFile(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.readAsArrayBuffer(file);
    fr.onload = (f) => {
      window.google &&
        window.google.script.run
          .withSuccessHandler(resolve)
          .withFailureHandler(reject)
          .saveFile(
            JSON.stringify([...new Int8Array(f.target.result)]),
            file.type,
            file.name
          );

      !window.google && setTimeout(() => resolve({fileUrl: "https://example.com/file"}), 2000);
    };
  });
}


const FileFormField = (props) => {

  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [show, setShow] = useState(false);

  const changeHandler = async (e) => {
    const file = e.target.files[0]
    if (!file) return;

    try {
      setShow(true);
      const { filename, fileId, fileUrl, folderUrl } = await saveFile(file);
      setIsFileUploaded(true);
      console.log(filename, fileId, fileUrl, folderUrl);
      setShow(false);
      props.handleChange({target: {id: props.name, name: props.name, value: fileUrl}});
    } catch(err){
      console.error(err);
      setShow(false);
    }
  };

  const cols = props.size ? props.size : 6;

  return (
    <Form.Group
      as={Col}
      sm="12"
      xs="12"
      md={cols}
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
          onChange={changeHandler}
          isValid={isFileUploaded}
        />
        <Form.Control.Feedback type="invalid">
          {props.error}
        </Form.Control.Feedback>
      </InputGroup>
      {!show && (
        <a href={props.value} target="_blank" rel="noreferrer">
          {props.value}
        </a>
      )}
      {show && (
        <div>
          <Spinner
            className="ms-2"
            as="span"
            size="sm"
            animation="border"
            aria-hidden="true"
          />
          <span className="mx-2">Uploading file...</span>
        </div>
      )}
    </Form.Group>
  );
}

export default FileFormField;
