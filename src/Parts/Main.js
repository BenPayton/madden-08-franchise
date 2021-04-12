import React from "react";
import Heading from "./Heading";
import ChklstOptions from "./ChklstOptions";
import Tabbable from "./Tabbable";
import BottomNav from "./BottomNav";
import SpinnerDiv from "./SpinnerDiv";

const main = (props) => {
  return (
    <main id="main" className="container bg-dark border mb-5">
      <Heading />
      <form>
        <hr className="mt-4" />
        <ChklstOptions />
        <hr className="mb-4" />
        <Tabbable />
        <BottomNav />
        <SpinnerDiv />
      </form>
    </main>
  );
};

export default main;
