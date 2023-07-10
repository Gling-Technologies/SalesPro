import React from 'react'
import { NavLink } from 'react-router-dom';

import "./Home.module.css";

const Home = () => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-wrap" style={{backgroundColor: "green"}}>
      <NavLink to="/enquiry">
        <div className="d-flex justify-content-center align-items-center">
          Enquiry
        </div>
      </NavLink>
      <NavLink to="/enquiry-status">
        <div className="d-flex justify-content-center align-items-center">
          Enquiry Status
        </div>
      </NavLink>
      <NavLink to="/test-drive">
        <div className="d-flex justify-content-center align-items-center">
          Test Drive
        </div>
      </NavLink>
      {/* <NavLink to="/demo">
        <div className="d-flex justify-content-center align-items-center">
          Demo
        </div>
      </NavLink> */}
    </div>
  );
}

export default Home