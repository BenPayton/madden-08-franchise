import React from "react";

const headNav = (props) => {
  return (
    <nav
      id="masterNav"
      className="navbar navbar-expand-md navbar-dark bg-dark fixed-top"
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src="img/madden08logo-sm.png"
            alt="Madden NFL 08"
            style={{
              filter: "drop-shadow(2px 2px 2px #000)",
              verticalAlign: "top",
            }}
          />
          <small className="ps-1 text-uppercase">Franchise Companion</small>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#masterNavItems"
          aria-controls="masterNavItems"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-center position-absolute w-100"
          id="masterNavItems"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className={
                  props.activePage === "franchise"
                    ? "nav-link active"
                    : "nav-link"
                }
                aria-current="page"
                href="/"
              >
                Franchise Checklist
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  props.activePage === "needs" ? "nav-link active" : "nav-link"
                }
                href="/"
              >
                Draft/Free Agent Helper
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default headNav;
