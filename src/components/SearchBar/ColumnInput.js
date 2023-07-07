import React from 'react'

const ColumnInput = React.forwardRef((props, ref) => {
  return (
    <div className="col-lg-2 col-md-3 col-sm-12 p-0">
      <select className="form-control" id="exampleFormControlSelect1" ref={ref}>
        <option>First Name</option>
        <option>Last Name</option>
        <option>Contact Number</option>
        <option>Company</option>
        <option>Location</option>
      </select>
    </div>
  );
});

export default ColumnInput