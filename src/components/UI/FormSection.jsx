import React, { useContext } from "react";

import Accordion from "react-bootstrap/Accordion";
import Tab from "react-bootstrap/Tab";

import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionButton } from "react-bootstrap/AccordionButton";

const PINK = "rgba(255, 192, 203, 0.6)";
const BLUE = "rgba(0, 0, 255, 0.6)";


const FormSection = (props) => {
  const { activeEventKey } = useContext(AccordionContext);
  const isCurrentEventKey = activeEventKey === props.id;
  const styles = {};
  // if  (!isCurrentEventKey){
  //   styles.display = "none";
  // }

  return (
    <Accordion.Item eventKey={props.id} style={styles}>
      <Accordion.Header>{props.title}</Accordion.Header>
      <Accordion.Body>{props.children}</Accordion.Body>
      {/* <Tab eventKey={props.id} title={props.title}> */}
      {/* </Tab> */}
    </Accordion.Item>
  );
};

export default FormSection