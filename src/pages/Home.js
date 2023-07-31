import React, { useEffect } from 'react'
import { NavLink, useOutletContext } from 'react-router-dom';

import "./Home.module.css";

const Home = () => {
  const { appConfig, uriLocation } = useOutletContext();

  // useEffect(() => {
  //   fetch(
  //     "/macros/s/AKfycbxylyb8bva4uI3sWzAeLKJXtDTsWxppNvi-FIPrcL3O0VkXBmVxKki7cGyShkLPcU22ew/exec",
  //     {
  //       method: "POST",
  //       mode: "no-cors",
  //       redirect: "follow",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ message: "Life is awesome. And so am I." }),
  //     }
  //   ).then((res) => {
  //     console.log("Response", res.ok);
  //     return  res.json();
  //   }).then((res) => {
  //     console.log("Response Data", res);
  //   }).catch(err => {
  //     console.error(err);
  //   });
  // }, [uriLocation]);

  return (
    <div
      className="d-flex home justify-content-center align-items-center flex-wrap"
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
      <NavLink to="/test-drive-exit">
        <div className="d-flex justify-content-center align-items-center">
          Test Drive
        </div>
      </NavLink>
      <NavLink to="/booking">
        <div className="d-flex justify-content-center align-items-center">
          Booking
        </div>
      </NavLink>
      <NavLink to="/billing-request">
        <div className="d-flex justify-content-center align-items-center">
          Billing Request
        </div>
      </NavLink>
      <NavLink to="/customer-info">
        <div className="d-flex justify-content-center align-items-center">
          Customer Info
        </div>
      </NavLink>
    </div>
  );
}

export default Home