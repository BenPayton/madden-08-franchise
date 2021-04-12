import React from "react";

const bottomNav = (props) => {
  return (
    <div id="bottomNav">
      <div className="row">
        <div className="col text-end">
          <button
            id="bnPrevious"
            type="button"
            className="btn btn-sm btn-danger h6"
          >
            &laquo; Previous Section
          </button>
        </div>
        <div className="col">
          <button
            id="bnNext"
            type="button"
            className="btn btn-sm btn-danger h6"
          >
            Next Section &raquo;
          </button>
          <button
            id="bnAdvance"
            type="button"
            className="confirmAdvance btn btn-success h6 d-none"
          >
            Advance to Next Season &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default bottomNav;
