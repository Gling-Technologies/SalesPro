import React, { useState, useEffect } from "react";
import Entry from "./Entry";

const RecordTable = (props) => {
  const [recordCount, setRecordCount] = useState(0);

  useEffect(() => {
    setRecordCount(3);
  }, [])

  return (
    <div className="row">
      <div className="col-12">
        <div className="card card-margin">
          <div className="card-body">
            <div className="row search-body">
              <div className="col-lg-12">
                <div className="search-result">
                  <div className="result-header">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="records">
                          Found: <b>{recordCount}</b> records
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="result-body">
                    <div className="table-responsive">
                      <table className="table widget-26">
                        <tbody>
                          {props.records.map((entryData) => (
                            <Entry key={entryData.avatarUrl} {...entryData} />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordTable;
