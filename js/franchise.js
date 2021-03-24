// global parameters
let curSeason = null,
  curYear = null,
  progress = null,
  chosenProgress = 0;

const maxSeasons = 25;
const frTabs = [
  "New Franchise",
  "Preseason",
  "Regular Season",
  "Postseason",
  "Start Offseason",
  "Coaches &amp; Owner's Box",
  "Roster Management",
  "Re-Sign Players",
  "Free Agency",
  "Draft",
  "Complete Offseason",
];
const frSteps = {
  0: { tabNum: 0, text: "Create Franchise" },
  1: { tabNum: 0, text: "First Time Setup" },
  2: { tabNum: 1, text: "Start Preseason" },
  3: { tabNum: 2, text: "Prepare CPU teams" },
  4: { tabNum: 2, text: "Prepare Depth Charts" },
  5: { tabNum: 2, text: "Start Regular Season" },
  6: { tabNum: 3, text: "Complete Postseason" },
  7: { tabNum: 4, text: "New Franchise File" },
  8: { tabNum: 4, text: "Editor adjustments" },
  9: { tabNum: 5, text: "Coaches" },
  10: { tabNum: 5, text: "Owner's Box" },
  11: { tabNum: 6, text: "Draft Class" },
  12: { tabNum: 6, text: "Progress Through Offseason" },
  13: { tabNum: 7, text: "Complete Re-Sign Players" },
  14: { tabNum: 8, text: "Progress to Free Agency" },
  15: { tabNum: 9, text: "Team Control" },
  16: { tabNum: 9, text: "Sim Draft In Game" },
  17: { tabNum: 9, text: "Complete Draft In Editor" },
  18: { tabNum: 9, text: "Sign Draft Picks In Game" },
  19: { tabNum: 10, text: "Progress Through the Rest of the Offseason" },
  20: { tabNum: 10, text: "Import Traded Draft Picks" },
};
const frItems = {
  0: { stepNum: 0, platform: [0], text: "Create new franchise", note: 0 },
  1: { stepNum: 0, platform: [0], text: "Skip Training Camp", note: 0 },
  2: { stepNum: 0, platform: [0], text: "Save and exit franchise", note: 0 },
  3: {
    stepNum: 1,
    platform: [1],
    text: "Set franchise options and injury sliders",
    note: 0,
  },
  4: { stepNum: 1, platform: [1], text: "Set progression weeks", note: 0 },
  5: { stepNum: 1, platform: [1, 2], text: "Set AI sliders", note: 0 },
  6: { stepNum: 1, platform: [2], text: "Set penalty sliders", note: 0 },
  7: {
    stepNum: 2,
    platform: [0],
    text: "Set sim injury slider to 30",
    note: 0,
  },
  8: { stepNum: 2, platform: [0], text: "Play or sim preseason", note: 0 },
  9: { stepNum: 2, platform: [0], text: "Progress to regular season", note: 0 },
  10: { stepNum: 2, platform: [0], text: "Revert sim injury slider", note: 0 },
  11: { stepNum: 2, platform: [0], text: "Save and exit franchise", note: 0 },
  12: {
    stepNum: 3,
    platform: [1],
    text: "Apply coach slider adjustments",
    note: 0,
  },
  13: { stepNum: 3, platform: [1, 2], text: "User control all teams", note: 0 },
  14: {
    stepNum: 3,
    platform: [0, 1, 2],
    text: "Review head coaches and note teams changing to/from 3-4 defense",
    note: 0,
  },
  15: {
    stepNum: 3,
    platform: [0, 1, 2],
    text: "Optimize MLB/DT/DE positions for teams changing to/from 3-4",
    note: 0,
  },
  16: {
    stepNum: 4,
    platform: [0, 1, 2],
    text: "Auto-reorder depth chart for all CPU teams",
    note: 0,
  },
  17: {
    stepNum: 4,
    platform: [0, 1, 2],
    text:
      "Review each team for obvious depth chart issues and make manual adjustments",
    note: 0,
  },
  18: {
    stepNum: 5,
    platform: [0],
    text: "Play/sim through regular season",
    note: 0,
  },
  19: { stepNum: 5, platform: [0], text: "Advance to postseason", note: 0 },
  20: {
    stepNum: 6,
    platform: [0],
    text: "Play/sim through playoffs and Super Bowl",
    note: 0,
  },
  21: {
    stepNum: 6,
    platform: [0],
    text: "Play/sim Pro Bowl, DO NOT ADVANCE TO OFFSEASON",
    note: 0,
  },
  22: { stepNum: 6, platform: [0], text: "Save franchise", note: 0 },
  23: {
    stepNum: 6,
    platform: [0],
    text: "Save as new file and exit franchise",
    note: 0,
  },
  24: {
    stepNum: 7,
    platform: [0],
    text: "Open new franchise file and advance to offseason",
    note: 0,
  },
  25: { stepNum: 7, platform: [0], text: "Save and exit franchise", note: 0 },
  26: {
    stepNum: 8,
    platform: [1, 2],
    text: "Remove user control for CPU teams",
    note: 0,
  },
  27: {
    stepNum: 8,
    platform: [1],
    text: "Revert coach slider adjustments",
    note: 0,
  },
  28: { stepNum: 8, platform: [1], text: "Run Advanced AWR Boost", note: 0 },
  29: { stepNum: 9, platform: [0], text: "Sign coaches if necessary", note: 0 },
  30: {
    stepNum: 9,
    platform: [0],
    text: "Review all teams and note new head coaches",
    note: 0,
  },
  31: {
    stepNum: 10,
    platform: [0],
    text: "Set prices and stadium updates as needed",
    note: 0,
  },
  32: {
    stepNum: 10,
    platform: [0],
    text: "Progress to Player Retirement",
    note: 0,
  },
  33: { stepNum: 10, platform: [0], text: "Save and exit franchise", note: 0 },
  34: { stepNum: 11, platform: [1], text: "Import draft class", note: 0 },
  35: { stepNum: 11, platform: [1], text: "Apply Rookie Ratings Fix", note: 0 },
  36: { stepNum: 11, platform: [1], text: "Apply player body fix", note: 0 },
  37: { stepNum: 11, platform: [1], text: "Apply career stat fix", note: 0 },
  38: {
    stepNum: 12,
    platform: [0],
    text: "Progress through Retired Players",
    note: 0,
  },
  39: {
    stepNum: 12,
    platform: [0],
    text: "Progress through Roster Management",
    note: 0,
  },
  40: {
    stepNum: 12,
    platform: [0],
    text: "Progress through Restricted Free Agents",
    note: 0,
  },
  41: {
    stepNum: 12,
    platform: [0],
    text: "Advance to Re-Sign Players",
    note: 0,
  },
  42: {
    stepNum: 13,
    platform: [0],
    text: "Re-sign players as needed but DO NOT ADVANCE",
    note: 0,
  },
  43: { stepNum: 13, platform: [0], text: "Save and exit franchise", note: 0 },
  44: {
    stepNum: 13,
    platform: [1],
    text: "Apply AWR regression fix",
    note: '(do not select "revert all ratings" or "all AWR changes")',
  },
  45: {
    stepNum: 14,
    platform: [0],
    text: "Progress through Free Agency to 0 days left, DO NOT ADVANCE",
    note: 0,
  },
  46: { stepNum: 14, platform: [0], text: "Save and exit franchise", note: 0 },
  47: {
    stepNum: 15,
    platform: [1, 2],
    text: "User control all teams",
    note: 0,
  },
  48: {
    stepNum: 16,
    platform: [0],
    text: "Sim draft and advance to Sign Draft Picks",
    note: "(do not sign any draft picks)",
  },
  49: { stepNum: 16, platform: [0], text: "Save and exit franchise", note: 0 },
  50: {
    stepNum: 17,
    platform: [2],
    text: "Complete draft in Madden Amp",
    note: 0,
  },
  51: {
    stepNum: 17,
    platform: [1, 2],
    text: "Remove user control for CPU teams",
    note: 0,
  },
  52: {
    stepNum: 18,
    platform: [0],
    text: "Sign rookies to dummy contracts",
    note: 0,
  },
  53: { stepNum: 18, platform: [0], text: "Advance to Free Agency", note: 0 },
  54: { stepNum: 18, platform: [0], text: "Save and exit franchise", note: 0 },
  55: {
    stepNum: 18,
    platform: [1],
    text: "Apply rookie contract fix",
    note: 0,
  },
  56: {
    stepNum: 19,
    platform: [0],
    text: "Complete Free Agency and advance",
    note: 0,
  },
  57: {
    stepNum: 19,
    platform: [0],
    text: "Reorder depth charts and advance",
    note: 0,
  },
  58: {
    stepNum: 19,
    platform: [0],
    text: "Start new season and advance to training camp",
    note: 0,
  },
  59: { stepNum: 19, platform: [0], text: "Save and exit franchise", note: 0 },
  60: {
    stepNum: 20,
    platform: [2],
    text: "Move traded draft picks from file",
    note: "(choose file saved at the end of draft)",
  },
  61: { stepNum: 20, platform: [0], text: "Skip training camp", note: 0 },
  62: { stepNum: 20, platform: [0], text: "Save and exit franchise", note: 0 },
};
const frPlatforms = {
  game: { name: "Game", imgUrl: "img/madden08-ico.png" },
  nza: { name: "NZA's Madden Editor", imgUrl: "img/maddeneditor-ico.png" },
  amp: { name: "Madden Amp", imgUrl: "img/maddenamp-ico.png" },
};
const infoCopy = {
  header: {
    title: "About the Franchise Checklist",
    body: `
<p>
  Use this page to keep track of your franchise, checking off steps as you complete them.
  <strong>This page uses cookies to save your progress in case you close the window or navigate away.</strong>
</p>

<h4>Checklist Steps</h4>
<ul>
  <li>The icons on the right of each step indicate which program can be used to complete the step</li>
  <li>If a step has more than one icon, it can be completed in any of the listed programs</li>
</ul>

<h4>Skipping Steps</h4>
<ul>
  <li>You may skip ahead and check the box of any step further down the list.
    Doing this will automatically check all of the previous steps.</li>
  <li>You may also skip backwards by clicking any check box before the current step.
    This will automatically uncheck any steps after the selected step.</li>
</ul>

<h4>Navigation</h4>
<p>Click the tabs on the left or use the buttons at the bottom to navigate through the checklist.
  A check mark will appear next to tabs that are completed.</p>

<h4>Completeing the Season</h4>
<p>After completing the entire checklist, you will be prompted to advance to the next season.
  This will bring you back to the beginning of the checklist, uncheck all steps, and increment the season and year values.</p>`,
  },
};

function setDefaults() {
  //check if globals are initialized and set if necessary
  //curSeason
  if (curSeason === null) {
    console.log("initializing curSeason...");
    let cookieCurSeason = parseInt(getCookie("curSeason"));
    if (isNaN(cookieCurSeason)) {
      curSeason = 1;
      console.log("curSeason set to default: " + curSeason);
    } else {
      curSeason = cookieCurSeason;
      console.log("curSeason updated from cookie: " + cookieCurSeason);
    }
  }

  //curYear
  if (curYear === null) {
    console.log("initializing curYear...");
    let cookieCurYear = parseInt(getCookie("curYear"));
    if (isNaN(cookieCurYear)) {
      curYear = 2007;
      console.log("curYear set to default: " + curYear);
    } else {
      curYear = cookieCurYear;
      console.log("curYear updated from cookie: " + cookieCurYear);
    }
  }

  //progress
  if (progress === null) {
    console.log("initializing progress...");
    let cookieProgress = parseInt(getCookie("progress"));
    if (isNaN(cookieProgress)) {
      progress = 0;
      console.log("progress set to default: " + progress);
    } else {
      progress = cookieProgress;
      console.log("progress updated from cookie: " + cookieProgress);
    }
  }

  return true;
}
function generateTabs() {
  //generates navigation tabs
  for (let i = 0; i < frTabs.length; i++) {
    var tabContent = `
      <button class="nav-link" id="tabbable-${i}-tab" data-bs-toggle="tab" data-bs-target="#tabbable-${i}" type="button" role="tab" aria-controls="tabbable-${i}" aria-selected="true">
        <span class="fa-stack fa-1x">
          <i class="far fa-circle fa-stack-1x"></i>
          <i class="fas fa-check fa-stack-1x"></i>
        </span>
        ${frTabs[i]}
      </button>`;
    $("#tabbable-tab").append(tabContent);
    generatePaneContent(i);
  }
  return true;
}
function generatePaneContent(tabNum) {
  //generate tab pane content
  var content = `
    <div class="tab-pane fade" id="tabbable-${tabNum}" role="tabpanel" aria-labelledby="tabbable-${tabNum}-tab">
      <h2 class="h1">
        ${frTabs[tabNum]}
      </h2>
      ${generateTabSteps(tabNum)}
    </div>`;
  $("#tabbable-tabContent").append(content);
  return true;
}
function generateTabSteps(tabID) {
  //generate tab pane steps
  var stepArr = [];
  Object.keys(frSteps).forEach((step) => {
    if (frSteps[step].tabNum == tabID) {
      stepArr.push(step);
    }
  });
  var content = '<ol class="fs-3">';
  stepArr.forEach((stepKey) => {
    content +=
      "<li>" +
      frSteps[stepKey].text +
      '<ul class="sublist list-group">' +
      generateStepItems(stepKey) +
      "</ul></li>";
  });
  content += "</ol>";
  return content;
}
function generateStepItems(stepID) {
  //generate step items
  var itemArr = [];
  Object.keys(frItems).forEach((item) => {
    if (frItems[item].stepNum == stepID) {
      itemArr.push(item);
    }
  });

  var content = "";
  itemArr.forEach((itemKey) => {
    content += `
      <li class="list-group-item">
        <div class="row">
          <div class="col-1">
            <input class="form-check-input" type="checkbox" value="${itemKey}" id="chklst-${itemKey}" />
          </div>
          <div class="col">`;
    frItems[itemKey].platform.forEach((key) => {
      content += generateImage(key);
    });
    content += frItems[itemKey].text;
    if (frItems[itemKey].note != 0) {
      content += `<br><small>${frItems[itemKey].note}</small>`;
    }
    content += `
          </div>
        </div>
      </li>`;
  });

  return content;
}
function generateImage(id) {
  var platform;
  switch (id) {
    case 0:
      platform = "game";
      break;
    case 1:
      platform = "nza";
      break;
    case 2:
      platform = "amp";
      break;
  }
  return `<img class="float-end" src="${frPlatforms[platform].imgUrl}" alt="${frPlatforms[platform].name}" title="${frPlatforms[platform].name}" data-bs-toggle="tooltip" data-bs-placement="bottom">`;
}
function generateSelectSeasons() {
  //generates options for seasons dropdown
  var x, selected, content;
  for (let i = 0; i < maxSeasons; i++) {
    x = i + 1;
    selected = "";
    if (x == curSeason) {
      selected = " selected";
    }
    content = "<option" + selected + ' value="' + x + '">' + x + "</option>";
    $("#seasonNum").append(content);
  }
}
function generateSelectYears() {
  //generates options for years dropdown
  var x, selected, content;
  var year = 2007;
  for (let i = 0; i < maxSeasons; i++) {
    x = i + 1;
    selected = "";
    if (year == curYear) {
      selected = " selected";
    }
    content =
      "<option" + selected + ' value="' + year + '">' + year + "</option>";
    $("#seasonYear").append(content);
    year++;
  }
}
function updateProgress() {
  //updates item checkboxes and sets active tab
  updateCookies();
  var item = progress;
  var tab = currentTab();

  //check all items up to progress point
  for (let i = 0; i <= item; i++) {
    $("#chklst-" + i).prop("checked", true);
    $("#chklst-" + i)
      .closest(".list-group-item")
      .addClass("bg-dark");
  }

  //uncheck all items past progress point
  for (let i = item; i < Object.keys(frItems).length; i++) {
    $("#chklst-" + i).prop("checked", false);
    $("#chklst-" + i)
      .closest(".list-group-item")
      .removeClass("bg-dark");
  }

  //set tab checkmarks
  completeTabs();

  //show active tab
  $("#tabbable-" + tab + "-tab").tab("show");
  updateTabNavButtons(tab);

  //check season completion
  if (progress >= Object.keys(frItems).length) {
    nextSeasonModal.show();
  }
  return true;
}
function updateCookies() {
  setCookie("progress", progress, {
    expires: setCookieDate(9999),
    samesite: "lax",
  });
  setCookie("curSeason", curSeason, {
    expires: setCookieDate(9999),
    samesite: "lax",
  });
  setCookie("curYear", curYear, {
    expires: setCookieDate(9999),
    samesite: "lax",
  });
  console.log("cookies updated.");

  return true;
}
function isTabCompleted(tabID) {
  // evaluates whether specified tab is completed
  var isComplete = false;
  var curItem = progress - 1;
  var tabPoints = [];
  var stepPoints = [];

  //calculate step points
  Object.keys(frItems).forEach((itemKey) => {
    Object.keys(frSteps).forEach(() => {
      stepPoints[frItems[itemKey].stepNum] = itemKey;
    });
  });

  //calculate tab points
  for (let i = 0; i < stepPoints.length; i++) {
    tabPoints[frSteps[i].tabNum] = stepPoints[i];
  }

  if (curItem >= tabPoints[tabID]) {
    isComplete = true;
  }

  return isComplete;
}
function completeTabs() {
  // evaluates each tab and sets completion checkmark
  for (let i = 0; i < frTabs.length; i++) {
    var idName = "#tabbable-" + i + "-tab";
    if (isTabCompleted(i)) {
      $(idName + " span.fa-stack").addClass("checked");
    } else {
      $(idName + " span.fa-stack").removeClass("checked");
    }
  }
  return true;
}
function currentTab() {
  //calculates current tab based on global progress value
  var curItem = progress;
  //adjust for min and max
  curItem = Math.max(0, curItem);
  curItem = Math.min(curItem, Object.keys(frItems).length - 1);

  var stepNum = frItems[curItem].stepNum;

  return frSteps[stepNum].tabNum;
}
function navigateToTab(id, next) {
  //navigates to tab before or after specified tab id
  var arr = id.split("-");
  var tabID = parseInt(arr[1]);

  //set new tab number
  var newTab;
  if (next) {
    newTab = tabID + 1;
  } else {
    newTab = tabID - 1;
  }

  //check if outside bounds
  if (newTab < 0) {
    newTab = 0;
  }
  if (newTab >= frTabs.length) {
    newTab = frTabs.length - 1;
  }
  console.log("newTab: " + newTab);

  //show new tab
  $("#tabbable-" + newTab + "-tab").tab("show");

  updateTabNavButtons(newTab);

  return true;
}
function updateTabNavButtons(tab) {
  //disable nav buttons if necessary
  $("#bnPrevious").prop("disabled", false);
  $("#bnNext").prop("disabled", false);
  if (tab == 0) {
    $("#bnPrevious").prop("disabled", true);
  } else if (tab >= frTabs.length - 1) {
    $("#bnNext").prop("disabled", true);
  }

  //remove focus
  $("#bnPrevious").blur();
  $("#bnNext").blur();

  return true;
}
