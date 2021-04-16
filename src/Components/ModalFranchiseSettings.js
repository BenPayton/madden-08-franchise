import React from "react";
import SelectGuideOption from "./SelectGuideOption";

const modalFranchiseSettings = (props) => {
  return (
    <div
      className="modal fade"
      id="checklistSettingsModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="checklistSettingsModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="checklistSettingsModalLabel">
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
              <i className="fas fa-sliders-h pe-2" />
              Franchise Settings
            </p>
            <p className="fs-5">
              Choose settings below to start your checklist:
            </p>
            <div id="chklst-options" className="row mb-3">
              <label
                className="col-auto col-form-label pe-2"
                htmlFor="chosenGuide"
              >
                Franchise Guide:
              </label>
              <div className="col-auto pe-4">
                <select
                  className="form-select bg-dark text-light border-secondary"
                  id="chosenGuide"
                >
                  {props.guides.map((key, index) => {
                    <SelectGuideOption option={key} key={index} />;
                  })}
                </select>
              </div>
            </div>
            <div id="chklst-options" className="row">
              <label
                className="col-auto col-form-label col-form-label-sm"
                htmlFor="seasonNum"
              >
                Season:
              </label>
              <div className="col-3">
                <input
                  type="number"
                  min={1}
                  max={30}
                  defaultValue={1}
                  className="form-control form-control-sm bg-dark text-light border-secondary"
                  id="seasonNum"
                />
              </div>
              <label
                className="col-auto col-form-label col-form-label-sm"
                htmlFor="seasonYear"
              >
                Year:
              </label>
              <div className="col-3">
                <input
                  type="number"
                  min={1900}
                  max={2100}
                  defaultValue={2007}
                  className="form-control form-control-sm bg-dark text-light border-secondary"
                  id="seasonYear"
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="confirm btn btn-danger">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default modalFranchiseSettings;
