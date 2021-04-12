import React from "react";

const chklstOptions = (props) => {
  return (
    <div id="chklst-options" className="d-flex justify-content-center">
      <label className="col-auto col-form-label pe-2">Guide:</label>
      <div className="col-auto pe-4">
        <button
          id="headGuide"
          type="button"
          className="btn btn-dark border-secondary"
          disabled
        />
      </div>
      <label className="col-auto col-form-label pe-2">Season:</label>
      <div className="col-auto pe-4">
        <button
          id="headSeason"
          type="button"
          className="btn btn-dark border-secondary"
          disabled
        />
      </div>
      <label className="col-auto col-form-label pe-2">Year:</label>
      <div className="col-auto pe-4">
        <button
          id="headYear"
          type="button"
          className="btn btn-dark border-secondary"
          disabled
        />
      </div>
      <div className="col-auto">
        <div className="d-flex align-items-center h-100">
          <button
            id="headEdit"
            type="button"
            className="btn btn-sm btn-outline-secondary"
          >
            <i className="fas fa-sliders-h" /> Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default chklstOptions;
