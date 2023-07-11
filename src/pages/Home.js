import React from 'react'
import { NavLink, Link } from 'react-router-dom';

import "./Home.module.css";

const Home = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center flex-wrap"
      style={{ backgroundColor: "green" }}
    >
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
      <a href="https://forms.gle/Vfwn2dZd2YPzZGFL7" target="_blank" rel="noreferrer">
        <div className="d-flex justify-content-center align-items-center">
          Booking
        </div>
      </a>
      <a href="https://forms.gle/DuKQwAY7VpGxWNFZ9" target="_blank" rel="noreferrer">
        <div className="d-flex justify-content-center align-items-center">
          Delivery
        </div>
      </a>
    </div>
  );
}

export default Home