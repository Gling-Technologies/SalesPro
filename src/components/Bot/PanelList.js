import React from "react";
import Accordion from "react-bootstrap/Accordion";

import Panel from "./Panel";

const PanelList = () => {
  const panels = [...new Array(10)].map((el, idx) => <Panel key={idx} id={ idx + 1 } />);

  return (
    <div className="row">
      <Accordion defaultActiveKey={0}>
        {panels}
      </Accordion>
    </div>
  );
};

export default PanelList;
