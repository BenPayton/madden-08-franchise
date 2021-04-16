import React from "react";

const tabStepItemImage = (props) => {
  let platform = null;
  switch (parseInt(props.id)) {
    case 0:
      platform = "game";
      break;
    case 1:
      platform = "nza";
      break;
    case 2:
      platform = "amp";
      break;
    default:
      return null;
  }

  return (
    <img
      src={platform.imgUrl}
      alt={platform.name}
      title={platform.name}
      data-bs-toggle="tooltip"
      data-bs-placement="bottom"
    />
  );
};

export default tabStepItemImage;
