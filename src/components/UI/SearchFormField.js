import React, { useState } from 'react'
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Typeahead } from "react-bootstrap-typeahead";

const SearchFormField = (props) => {
  const [singleSelections, setSingleSelections] = useState([]);
  const options = [
    { id: 1, name: "John" },
    { id: 2, name: "Miles" },
    { id: 3, name: "Charles" },
    { id: 4, name: "Herbie" },
  ];
  const ref = React.createRef();

  const changeHandler = (value) => {
    console.log(value);
    setSingleSelections(value);
  }

  return (
    <Col sm="12">
      <Form.Group className="mb-3">
        <Form.Label htmlFor={props.id}>{props.name}</Form.Label>
        {/* <InputGroup className="mb-3"> */}
        {/* <InputGroup.Text>
            <i className={`bi bi-${props.icon} prefix`}></i>
          </InputGroup.Text> */}
        <Typeahead
          id={props.id}
          required={true}
          labelKey="name"
          onChange={props.onChange}
          options={options}
          placeholder={props.placeholder}
          selected={props.value}
          paginate={true}
          ref={ref}
          renderMenuItemChildren={(option) => (
            <div>
              {option.name}
              <div>
                <small>Customer Name: {JSON.stringify(option)}</small>
              </div>
            </div>
          )}
        />
        {/* </InputGroup> */}
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