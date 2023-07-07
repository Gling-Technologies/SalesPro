import React from 'react'

const CategoryInput = React.forwardRef((props, ref) => {
  return (
    <div className="col-lg-2 col-md-3 col-sm-12 p-0">
      <select className="form-control" id="exampleFormControlSelect1" ref={ref}>
        <option disabled>
          Choose a Category
        </option>
        <option>Today's</option>
        <option>Month's</option>
        <option>Contact Number</option>
        <option>Company</option>
        <option>Location</option>
      </select>
    </div>
  );
});

export default CategoryInput