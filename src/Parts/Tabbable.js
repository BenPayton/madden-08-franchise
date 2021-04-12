import React from "react";
import TabList from "./TabList";
import TabContent from "./TabContent";

const tabbable = (props) => {
  return (
    <div id="tabbable">
      <div className="d-flex align-items-start">
        <TabList />
        <TabContent />
      </div>
    </div>
  );
};

export default tabbable;
