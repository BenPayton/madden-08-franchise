import React from "react";

const spinnerDiv = (props) => {
  return (
    <div id="spinnerDiv" className="d-none">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="fa-10x text-center" style={{ opacity: "0.2" }}>
          <i className="fas fa-sync-alt fa-spin" />
        </div>
      </div>
    </div>
  );
};

export default spinnerDiv;
