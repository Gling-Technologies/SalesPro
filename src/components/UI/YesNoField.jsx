import React from 'react'
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const YesNoField = (props) => {
    const optionItems = ["Yes", "No"];
    return (
      <Form.Group as={Col} sm="12" xs="12" md={6}>
        <Form.Label> {props.name} </Form.Label>
        {optionItems &&
          optionItems.map((optionItem, idx) => (
            <Form.Check
              className="mb-3"
              key={optionItem}
              type="radio"
              id={`${props.name}__${optionItem}`}
              name={props.name}
              label={optionItem}
              onChange={props.handleChange}
              value={optionItem}
              checked={props.value === optionItem || (!props.value && !idx)}
            />
          ))}
      </Form.Group>
    );
}

export default YesNoField;