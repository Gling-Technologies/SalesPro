import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";

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
    };
  });
}


const FileFormField = (props) => {

  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [show, setShow] = useState(false);

  const changeHandler = async (e) => {
    const file = e.target.files[0]
	console.log(file);
	try {
		const { filename, fileId, fileUrl, folderUrl } = await saveFile(file);
		setIsFileUploaded(true);
		console.log(filename, fileId, fileUrl, folderUrl);
		props.handleChange(fileUrl);
	} catch(err){
		console.error(err);
	}
  };

//   if(false){
// 	return (
//     <>
//       <Toast
//         onClose={() => setShow(false)}
//         show={show}
//         delay={3000}
//         autohide
//         bg="danger"
//         position="top-end"
//         style={{ zIndex: 1 }}
//       >
//         <Toast.Header>
//           {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
//           <strong className="me-auto">Bootstrap</strong>
//           <small>11 mins ago</small>
//         </Toast.Header>
//         <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
//       </Toast>
//       <Col xs={6}>
//         <Button onClick={() => setShow(true)}>Show Toast</Button>
//       </Col>
//     </>
//   );
//   }

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
          onChange={changeHandler}
          isValid={isFileUploaded}
        />
        <Form.Control.Feedback type="invalid">
          {props.error}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
}

export default FileFormField;
