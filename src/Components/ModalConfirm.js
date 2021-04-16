import React from "react";

const modalConfirm = (props) => {
  return (
    <div
      id={props.modalId}
      className="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby={props.modalId + "Label"}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={props.modalId + "Label"}>
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
          </div>
          <div className="modal-body">
            <p
              className="h3"
              style={{
                webkitTextShadow: "1px 1px 3px #000",
                textShadow: "1px 1px 3px #000",
              }}
            >
              <i className="fas fa-exclamation-triangle pe-2" />
              {props.title}
            </p>
            <p className="fs-5" id={props.modalId + "-warning"}>
              {props.warning}
            </p>
            <p id={props.modalId + "-item"} className="fst-italic">
              {props.item}
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="cancel btn btn-secondary me-3"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="button" className="confirm btn btn-danger">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default modalConfirm;
