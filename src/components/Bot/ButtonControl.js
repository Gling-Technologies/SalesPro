import React from 'react'
import Form from "react-bootstrap/Form";

const ButtonControl = () => {
  return (
    <div className="row">
      <Form.Group
        className="col col-md-6 mb-3"
        controlId="exampleForm.ControlInput1"
      >
        <Form.Label>Button 1 Text</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <Form.Group class="col col-md-6">
        <Form.Label>Next Card</Form.Label>
        <Form.Select class="form-control" id="exampleFormControlSelect1">
          <option>Card 1</option>
          <option>Card 2</option>
          <option>Card 3</option>
          <option>Card 4</option>
          <option>Card 5</option>
        </Form.Select>
      </Form.Group>
    </div>
  );
}

export default ButtonControl;