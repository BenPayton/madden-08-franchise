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
    modalConfirmNextSeason: {
      modalId: "nextSeasonModal",
      title: "Confirmation",
      warning: "Advance to next season?",
      item: "",
    },
    modalConfirmSkip: {
      modalId: "skipConfirmModal",
      title: "Confirmation",
      warning: "Are you sure you want to skip to this step?",
      item: "",
    },
    modalConfirmSettings: {
      modalId: "confirmChangeSettingsModal",
      title: "Change Franchise Settings",
      warning: "Are you sure you want to change settings and start over?",
      item: "",
    },
    modalInfo: {
      modalId: "infoModal",
      title: "Info",
      body: "Info...",
    },
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
