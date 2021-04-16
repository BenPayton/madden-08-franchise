import React from "react";
import TabSteps from "../Components/TabSteps";

const tabContent = (props) => {
  return (
    <div className="tab-content col" id="tabbable-tabContent">
      {props.items.map((item) => (
        <div
          class="tab-pane fade"
          id={"tabbable-" + item.key}
          role="tabpanel"
          aria-labelledby={"tabbable-" + item.key + "-tab"}
        >
          <h2 class="h1">{item.text}</h2>
          <TabSteps key={item.key} />
        </div>
      ))}
    </div>
  );
};

export default tabContent;
