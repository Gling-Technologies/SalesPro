import React, { useRef, useState } from 'react'
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Typeahead } from "react-bootstrap-typeahead";

const SearchFormField = (props) => {
  const [singleSelections, setSingleSelections] = useState([]);
  const [hiddenInputVal, setHiddenInputVal] = useState("");
  const hiddenInputRef = useRef();

  const changeHandler = (values, ...args) => {
    console.log(values);
    setSingleSelections(values);
    if(values.length > 0){
      props.handleChange(values[0].name);

      // setHiddenInputVal(values[0].name);
    } else {
      props.handleChange("");

      // setHiddenInputVal("");
    }

    props.handleChange();

    // setTimeout(() => {
    //   var event = new Event("change");
    //   console.log(hiddenInputRef.current);
    //   hiddenInputRef.current.dispatchEvent(event);
    // }, 1000);
  }

  // const hiddenInputChangeHandler = (event) => {
  //   console.log("hiddenInputChangeHandler triggered");
  //   props.handleChange(event);
  // }

  return (
    <Col sm="12">
      <Form.Group className="mb-3">
        <Form.Label htmlFor={props.id}>{props.name}</Form.Label>
        <Typeahead
          id={props.id}
          required={true}
          labelKey="name"
          onChange={changeHandler}
          options={props.options}
          placeholder={props.placeholder}
          selected={singleSelections}
          paginate={true}
          renderMenuItemChildren={(option) => (
            <div>
              {option.name}
              <div>
                <small>Customer Name: {JSON.stringify(option)}</small>
              </div>
            </div>
          )}
        />
        {/* <Form.Control
          type="hidden"
          name={props.name}
          onChange={hiddenInputChangeHandler}
          value={hiddenInputVal}
          ref={hiddenInputRef}
        ></Form.Control> */}
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