import React, { useRef } from "react";
import CategoryInput from "./CategoryInput";
import ColumnInput from "./ColumnInput";

import styles from "./SearchBar.module.css";
import SearchInput from "./SearchInput";

const SearchBar = () => {
  const categoryInputRef = useRef();
  const columnInputRef = useRef();
  const searchInputRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log(
      categoryInputRef.current.value,
      columnInputRef.current.value,
      searchInputRef.current.value
    );
  }

  return (
    <div className="row">
      <div className="col-lg-12 card-margin">
        <div className="card search-form">
          <div className="card-body p-0">
            <form onSubmit={formSubmitHandler}>
              <div className="row">
                <div className="col-12">
                  <div className="row no-gutters">
                    <CategoryInput ref={categoryInputRef} />
                    <ColumnInput ref={columnInputRef} />
                    <SearchInput ref={searchInputRef} />
                    <div className="col-lg-1 col-md-3 col-sm-12 p-0">
                      <button type="submit" className="btn btn-base">
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
                          className="feather feather-search"
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
