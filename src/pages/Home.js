import React, { useEffect } from 'react'
import { NavLink, useOutletContext } from 'react-router-dom';

import "./Home.module.css";

const Home = () => {
  const { appConfig, uriLocation } = useOutletContext();

  // useEffect(() => {
  //   fetch(uriLocation, {
  //     method: "POST",
  //     mode: "no-cors",
  //     redirect: "follow",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ message: "Life is awesome. And so am I." }),
  //   }).then((res) => {
  //     console.log("Response", res.ok);
  //   });
  // }, [uriLocation]);

  return (
    <div
      className="d-flex justify-content-center align-content-center flex-wrap"
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
      <NavLink to="/booking">
        <div className="d-flex justify-content-center align-items-center">
          Booking
        </div>
      </NavLink>
      <NavLink to="/delivery">
        <div className="d-flex justify-content-center align-items-center">
          Delivery
        </div>
      </NavLink>
      <NavLink to="/customer-info">
        <div className="d-flex justify-content-center align-items-center">
          Customer Information
        </div>
      </NavLink>
    </div>
  );
}

export default Home