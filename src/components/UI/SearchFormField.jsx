import React, { useState } from 'react'
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Typeahead } from "react-bootstrap-typeahead";

const SearchFormField = (props) => {
  const [selected, setSelected] = useState([]);
  const [fieldValue, setFieldValue] = useState("");

  if (props.value !== fieldValue) {
    setFieldValue(props.value);
    setSelected([{ [props.name]: props.value }]);
  }

  const changeHandler = (values) => {
    console.log(values);
    setSelected(values);
    if(values.length > 0){
      setFieldValue(values[0][props.name]);
      props.handleChange(values[0][props.name], values[0]);
    } else {
      props.handleChange("", {});
    }
  }

  return (
    <Col sm="12">
      <Form.Group className="mb-3">
        <Form.Label htmlFor={props.id}>
          {props.name}
        </Form.Label>
        <Typeahead
          id={props.id}
          required={true}
          isInvalid={props.touched && !!props.error}
          labelKey={props.name}
          onChange={changeHandler}
          options={props.optionItems}
          placeholder={props.placeholder}
          selected={selected}
          paginate={true}
          renderMenuItemChildren={(option) => (
            <div>
              {option[props.name]}
              {/* <div>
                <small>{Object.entries(option).map(([x, y]) => `${x} : ${y}`).join(" | ")}</small>
              </div> */}
            </div>
          )}
        />
        <Form.Control.Feedback type="invalid">
          {props.error}
        </Form.Control.Feedback>
      </Form.Group>
    </Col>
  );
}

export default SearchFormField;


SearchFormField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  options: PropTypes.array,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalSymbol: PropTypes.symbol,
};