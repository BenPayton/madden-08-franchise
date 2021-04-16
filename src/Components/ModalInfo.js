import React from "react";

const modalInfo = (props) => {
  return (
    <div
      id="infoModal"
      className="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="infoModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="infoModalLabel">
              <img
                src="img/madden08logo-sm.png"
                alt="Madden NFL 08"
                style={{
                  filter: "drop-shadow(2px 2px 2px #000)",
                  verticalAlign: "text-bottom",
                }}
              />
              Franchise Companion
            </h5>
            <button
              type="button"
              className="close btn btn-link btn-lg btn-close text-light"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i className="fas fa-times" />
            </button>
          </div>
          <div className="modal-body">
            <p
              className="h3"
              style={{
                webkitTextShadow: "1px 1px 3px #000",
                textShadow: "1px 1px 3px #000",
              }}
            >
              <i className="fas fa-info-circle pe-2" />
              <span id="infoTitle">{props.title}</span>
            </p>
            <p className="fs-5" id="infoBody">
              {props.body}
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="cancel btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default modalInfo;
