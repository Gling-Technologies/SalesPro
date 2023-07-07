import React from "react";

const Entry = (props) => {
  return (
    <tr>
      <td>
        <div className="widget-26-job-emp-img">
          <img src={props.avatarUrl} alt="Company" />
        </div>
      </td>
      <td>
        <div className="widget-26-job-title">
          <a href="#">{props.designation}</a>
          <p className="m-0">
            <a href="#" className="employer-name">
              {props.org}
            </a>
            <span className="text-muted time">{props.time}</span>
          </p>
        </div>
      </td>
      <td>
        <div className="widget-26-job-info">
          <p className="type m-0">{props.roleType}</p>
          <p className="text-muted m-0">
            in <span className="location">{props.location}</span>
          </p>
        </div>
      </td>
      <td>
        <div className="widget-26-job-salary">$ {props.salary}</div>
      </td>
      <td>
        <div className="widget-26-job-category bg-soft-base">
          <i className={`indicator ${props.class}`}></i>
          {props.skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </td>
      <td>
        <div className="widget-26-job-starred">
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-star"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </a>
        </div>
      </td>
    </tr>
  );
};

export default Entry;
