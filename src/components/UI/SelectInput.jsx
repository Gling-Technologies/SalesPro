import React from 'react'
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";


const SelectInput = (props) => {
  let inputProps = {
    name: props.name,
    "aria-label": props.name,
    required: props.required || false,
    value: props.value,
    disabled: props.disabled || false,
    isInvalid: props.touched && !!props.error,
    onChange: props.handleChange,
    // onBlur: {props.onBlur}
  };

  const iconElement = props.icon && (
    <InputGroup.Text>
      <i className={`bi bi-${props.icon} prefix`}></i>
    </InputGroup.Text>
  );

  const optionList = props.optionItems &&
    props.optionItems.map((optionItem) => (
      <option key={optionItem} value={optionItem}>
        {optionItem}
      </option>
    ));

  const cols = props.size ? props.size : 6;

  return (
    <Form.Group
      as={Col}
      sm="12"
      xs="12"
      md={cols}
      controlId={props.name + "__controlId"}
    >
      <Form.Label>
        {" "} {props.name} {" "}
        {props.required && <span style={{ color: "red" }}>*</span>}
      </Form.Label>
      <InputGroup className="mb-3" hasValidation>
        {iconElement}
        <Form.Select {...inputProps}>
          <option disabled value="">
            Select an Option
          </option>
          {optionList}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {props.error}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
}

export default SelectInput;