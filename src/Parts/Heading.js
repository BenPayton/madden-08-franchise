import React from "react";

const heading = (props) => {
  return (
    <div id="heading" className="text-center my-4 px-3">
      <h1
        className="display-4"
        style={{
          WebkitTextShadow: "5px 5px 5px #000",
          textShadow: "5px 5px 5px #000",
        }}
      >
        <img
          src="img/madden08logo.png"
          alt="Madden NFL 08"
          style={{
            filter: "drop-shadow(5px 5px 5px #000)",
            width: "363px",
            height: "100px",
            verticalAlign: "middle",
          }}
        />{" "}
        Franchise Checklist
      </h1>
      <p className="lead">
        Use this to keep track of your franchise season by season.
        <button
          type="button"
          className="info btn btn-outline-secondary btn-sm btn-smaller ms-2"
          value="header"
        >
          <i className="fas fa-info-circle" /> Info
        </button>
      </p>
    </div>
  );
};

export default heading;
