import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import classes from "./Layout.module.css";


const Layout = () => {
  const [location, setLocation] = useState("");


  useEffect(() => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const locationUrl = `https://maps.google.com/maps?z=18&q=${position.coords.latitude},${position.coords.longitude}`;
            setLocation(locationUrl);
          },
          (err) => {
            console.log(JSON.stringify(err.code, err.message));
          }
        );
      } else {
        console.log("Not Available");
      }

  }, []);



  return (
    <React.Fragment>
      <Outlet context={{location}}></Outlet>
    </React.Fragment>
  );
};

export default Layout;
