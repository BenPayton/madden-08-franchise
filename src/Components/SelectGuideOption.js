import React from "react";

const selectGuideOption = (props) => {
  return <option value={props.key}>{props.name}</option>;
};

export default selectGuideOption;
