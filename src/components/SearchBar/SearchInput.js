import React from 'react'

const SearchInput = React.forwardRef((props, ref) => {
  return (
    <div className="col-lg-7 col-md-6 col-sm-12 p-0">
      <input
        type="text"
        placeholder="Search..."
        className="form-control"
        id="search"
        name="search"
        ref={ref}
      />
    </div>
  );
});

export default SearchInput