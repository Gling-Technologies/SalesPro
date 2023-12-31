import React from 'react'
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const FormField = (props) => {
  const as = props.as || "input";
  const cols = as === "textarea" ? 12 : 6;
  const disabled = props.disabled || false;

  if (props.type === "select"){
    return (
      <Form.Group
        as={Col}
        sm="12"
        xs="12"
        md={cols}
        controlId={props.id}
        className="mb-3"
      >
        {props.icon && <i className={`bi bi-${props.icon} prefix`}></i>}
        <Form.Label className="ms-2"> {props.name} </Form.Label>
        <Form.Select
          aria-label={props.name}
          required={props.required || false}
          value={props.value}
          disabled={disabled}
          onChange={props.handleChange}
          isInvalid={props.touched && !!props.error}
          // onBlur={props.onBlur}
        >
          <option disabled value="">
            Select an Option
          </option>
          {props.optionItems &&
            props.optionItems.map((optionItem) => (
              <option key={optionItem} value={optionItem}>
                {optionItem}
              </option>
            ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {props.error}
        </Form.Control.Feedback>
      </Form.Group>
    );
  }

  // let [datalist, datalistId] = [null,""];
  // if (props.type === "text" && props.optionItems) {
  //   datalist = (
  //     <datalist id=''>
  //       {props.optionItems.map((optionItem) => (
  //         <option key={optionItem} value={optionItem}>
  //           {optionItem}
  //         </option>
  //       ))}
  //     </datalist>
  //   );
  // }

  return (
    <Form.Group as={Col} sm="12" xs="12" md={cols} controlId={props.id}>
      <Form.Label>{props.name}</Form.Label>
      <InputGroup className="mb-3" hasValidation>
        {props.icon && (
          <InputGroup.Text>
            <i className={`bi bi-${props.icon} prefix`}></i>
          </InputGroup.Text>
        )}
        <Form.Control
          type={props.type}
          required={props.required || false}
          placeholder={props.placeholder}
          aria-label={props.name}
          value={props.value}
          disabled={disabled}
          onChange={props.handleChange}
          // onBlur={props.onBlur}
          isInvalid={props.touched && !!props.error}
          as={as}
        />
        <Form.Control.Feedback type="invalid">
          {props.error}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
}

export default React.memo(FormField);


FormField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  touched: PropTypes.bool,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalSymbol: PropTypes.symbol,
};