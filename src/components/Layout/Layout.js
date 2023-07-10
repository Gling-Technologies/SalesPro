import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { inputOptions, appConfiguration } from '../../config';

async function fetchConfiguration() {
  const result = await new Promise((resolve, reject) => {
    window.google && window.google.script.run
      .withSuccessHandler(resolve)
      .withFailureHandler(reject)
      .getConfiguration();
  });
  return result;
}

const Layout = () => {
  const [location, setLocation] = useState("");
  const [config, setConfig] = useState({});
  const navigate = useNavigate()

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

  useEffect(() => {
    fetchConfiguration().then((conf) => {
      setConfig(conf);
    });

    window.google &&
      window.google.script.url.getLocation(function (location) {
        if (
          "formType" in location.parameters &&
          ["enquiry", "enquiry-status", "test-drive"].includes(
            location.parameter["formType"]
          )
        ) {
          navigate("/" + location.parameters["formType"][0]);
        }
      });
  }, [navigate]);

  console.log("Rendering Layout");

  return (
    <React.Fragment>
      <Outlet
        context={{
          location,
          config,
          inputOptions,
          appConfig: appConfiguration,
        }}
      ></Outlet>
    </React.Fragment>
  );
};

export default Layout;
