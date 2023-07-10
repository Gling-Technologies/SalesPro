import React from 'react'
import { Link } from 'react-router-dom';
import { Formik } from "formik";

import "./FormCard.module.css";

const FormCard = (props) => {
  return (
    <Formik
      validationSchema={props.validationSchema}
      onSubmit={props.submitHandler}
      initialValues={props.initialValues}
      // validate={props.validate}
    >
      <section className="height-70 o-hidden">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-8 col-md-10 col-sm-10">
              <div className="card shadow-lg">
                <div
                  className="card-body p-4 p-md-5 bg-gradient"
                  style={{ backgroundColor: "#dedede" }}
                >
                  <Link to="/" className="position-absolute h2 text-secondary">
                    <i className="bi bi-arrow-left-circle-fill"></i>
                  </Link>
                  <h2 className="text-center mb-5">{props.title}</h2>
                  {props.children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Formik>
  );
};

export default FormCard;