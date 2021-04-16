import React from "react";

const tabbableTab = (props) => {
  return (
    <button
      className="nav-link"
      id={"tabbable-" + props.item.key + "-tab"}
      data-bs-toggle="tab"
      data-bs-target={"#tabbable-" + props.item.key}
      type="button"
      role="tab"
      aria-controls={"tabbable-" + props.item.key}
      aria-selected="true"
      value={props.item.key}
    >
      <span className="fa-stack fa-1x">
        <i className="far fa-circle fa-stack-1x" />
        <i className="fas fa-check fa-stack-1x" />
      </span>
      {props.item.tabText}
    </button>
  );
};

export default tabbableTab;
