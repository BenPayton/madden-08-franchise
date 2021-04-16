import React from "react";
import TabStepItemImage from "./TabStepItemImage";

const tabStepItem = (props) => {
  let stepNote = null;
  if (props.note !== 0) {
    stepNote = (
      <span>
        <br />
        <small>{props.note}</small>
      </span>
    );
  }

  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-auto">
          <input
            className="form-check-input"
            type="checkbox"
            value={props.item}
            id={"chklst-" + props.item}
          />
        </div>
        <div className="col">
          <div className="float-end">
            {props.platform.map((key, index) => {
              return <TabStepItemImage platform={key} key={index} />;
            })}
          </div>
          {props.text}
          {stepNote}
        </div>
      </div>
    </li>
  );
};

export default tabStepItem;
