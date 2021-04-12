import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Assets/google-fonts.css";
import "./Assets/fonts/fontawesome/css/all.css";
import "./App.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import HeadNav from "./Parts/HeadNav";
import Main from "./Parts/Main";

class App extends Component {
  state = {
    activePage: "franchise",
    chosenGuide: null,
    curSeason: null,
    curYear: null,
    progress: null, //progress = first step in the checklist that is not checked
    chosenProgress: 0,
    stepVals: null,
    tabVals: null,
  };

  render() {
    return (
      <div className="App">
        <HeadNav activePage={this.state.activePage} />
        <Main />
      </div>
    );
  }
}

export default App;
