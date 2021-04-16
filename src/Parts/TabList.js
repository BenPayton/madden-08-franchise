import React from "react";
import TabbableTab from "../Components/TabbableTab";

const tabList = (props) => {
  return (
    <div
      className="nav flex-column col-3 nav-tabs me-3"
      id="tabbable-tab"
      role="tablist"
      aria-orientation="vertical"
    >
      {props.items.map((item) => (
        <TabbableTab item={item} />
      ))}
    </div>
  );
};

export default tabList;
