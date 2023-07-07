import React, { useRef } from 'react'
import Form from "react-bootstrap/Form";
import ButtonSet from './ButtonSet';

const FlowStepForm = () => {
  const nameInputRef = useRef();
  const messageInputRef = useRef();
  const fileInputRef = useRef();

  const nameInputChangeHandler = () => {
    console.log(nameInputRef.current.value);
  }

  return (
    <div className="col col-md-6 border-right">
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter the card name here..."
          ref={nameInputRef}
          onChange={nameInputChangeHandler}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Message</Form.Label>
        <Form.Control as="textarea" rows={3} ref={messageInputRef} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Add Image</Form.Label>
        <Form.Control type="file" ref={fileInputRef} />
      </Form.Group>
      <ButtonSet />
    </div>
  );
}

export default FlowStepForm