import React from "react";
import TabStepItem from "./TabStepItem";

const tabSteps = (props) => {
  return (
    <ol class="fs-3">
      {props.steps.map((step, index) => {
        return (
          <li key={index}>
            {step.text}
            <ul class="sublist list-group">
              <TabStepItem step="props.step" />
            </ul>
          </li>
        );
      })}
    </ol>
  );
};

export default tabSteps;
