import React from 'react'
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";


const FormField = (props) => {
  return (
    <Col md="6" sm="12" lg="4">
      <Form.Label htmlFor={props.id}>{props.name}</Form.Label>
      <InputGroup className="mb-3">
        {props.icon && (
          <InputGroup.Text>
            <i className={`bi bi-${props.icon} prefix`}></i>
          </InputGroup.Text>
        )}
        <Form.Control
          id={props.id}
          type={props.type}
          required={props.required || false}
          placeholder={props.placeholder}
          aria-label={props.name}
        />
      </InputGroup>
    </Col>
  );
}

export default FormField;


FormField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalSymbol: PropTypes.symbol,
};