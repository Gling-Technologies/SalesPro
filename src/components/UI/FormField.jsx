import React from 'react'
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FileFormField from './FileFormField';
import RadioFormInput from './RadioFormInput';
import SelectInput from './SelectInput';

const FormField = (props) => {

  if(props.type === "file"){
    return <FileFormField {...props} />
  } else if (props.type === "radio") {
    return <RadioFormInput {...props} />;
  } else if (props.type === "select"){
    return <SelectInput {...props} />;
  }

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

  let [datalist, datalistId] = [null, `${props.name}-list`];
  if (props.type === "text" && props.optionItems) {
    datalist = (
      <datalist id={datalistId}>
        {props.optionItems.map((optionItem) => (
          <option key={optionItem} value={optionItem}>
            {optionItem}
          </option>
        ))}
      </datalist>
    );
  }

  const optional_attrs = ["type", "placeholder", "as", "minLength", "maxLength"];
  inputProps = optional_attrs
    .filter(attr => attr in props)
    .reduce(
      (obj, attr) => Object.assign(obj, { [attr]: props[attr] }),
      inputProps
    );

  if (datalist && datalistId) inputProps.list = datalistId;

  const cols = props.size ? props.size : 6;

  return (
    <Form.Group as={Col} sm="12" xs="12" md={cols} controlId={props.name + "__controlId"}>
      <Form.Label>{props.name}</Form.Label>
      <InputGroup className="mb-3" hasValidation>
        {iconElement}
        <Form.Control {...inputProps} />
        {datalist}
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
  // optionalNumber: PropTypes.number,
  // optionalObject: PropTypes.object,
  // optionalSymbol: PropTypes.symbol,
};