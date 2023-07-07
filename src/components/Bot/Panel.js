import React, { useState } from 'react'
import Accordion from "react-bootstrap/Accordion";


import FlowStepForm from "./FlowStepForm";
import './Panel.css';


const Panel = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Accordion.Item eventKey={props.id} className="mb-2">
      <Accordion.Header>
        <span> Card {props.id} </span>
        {isEditing && (
          <i
            className="bi bi-file-plus-fill"
            style={{ fontSize: "1.8rem" }}
          ></i>
        )}
        {isEditing && (
          <i className="bi bi-x" style={{ fontSize: "1.8rem" }}></i>
        )}
      </Accordion.Header>
      <Accordion.Body>
          <FlowStepForm />
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default Panel;

