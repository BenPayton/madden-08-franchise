import * as cookies from "./Utils/cookie";

export class Franchise {
  //properties
  chosenGuide = null;
  curSeason = null;
  curYear = null;
  progress = null; //progress = first step in the checklist that is not checked
  chosenProgress = 0;
  stepVals;
  tabVals;

  curChecklist = new Map();
  curSteps = new Map();
  curTabs = new Map();
  maxSeasons = 25;

  frGuides = {
    0: { name: "Nza's Franchise Guide" },
    1: { name: "RevanFan's Franchise Guide" },
  };
  frTabs = {
    0: { text: "Start Offseason" },
    1: { text: "Owner's Box" },
    2: { text: "Roster Management" },
    3: { text: "Re-Sign Players" },
    4: { text: "Free Agency" },
    5: { text: "Draft" },
    6: { text: "Complete Offseason" },
    7: { text: "New Franchise" },
    8: { text: "Prepare Preseason" },
    9: { text: "Preseason" },
    10: { text: "Regular Season" },
    11: { text: "Postseason" },
  };
  frSteps = {
    0: { tabNum: 0, text: "New Franchise File" },
    1: { tabNum: 0, text: "End of Season Roster Management" },
    2: { tabNum: 0, text: "End of Season Editor Adjustments" },
    3: { tabNum: 0, text: "Start Offseason" },
    4: { tabNum: 1, text: "Staff" },
    5: { tabNum: 1, text: "Owner's Box" },
    6: { tabNum: 2, text: "Draft Class" },
    7: { tabNum: 2, text: "Progress Through Offseason" },
    8: { tabNum: 3, text: "Complete Re-Sign Players" },
    9: { tabNum: 4, text: "Progress to Free Agency" },
    10: { tabNum: 4, text: "Team Control" },
    11: { tabNum: 5, text: "Sim Draft In Game" },
    12: { tabNum: 5, text: "Complete Draft In Editor" },
    13: { tabNum: 5, text: "Sign Draft Picks In Game" },
    14: { tabNum: 6, text: "Progress Through the Rest of the Offseason" },
    15: { tabNum: 6, text: "Import Traded Draft Picks" },

    16: { tabNum: 7, text: "Create Franchise" },
    17: { tabNum: 7, text: "First Time Setup" },

    18: { tabNum: 8, text: "Prepare Preseason" },
    19: { tabNum: 8, text: "Prepare Depth Charts" },
    20: { tabNum: 9, text: "Roster Management" },
    21: { tabNum: 9, text: "Play Preseason" },
    22: { tabNum: 10, text: "Prepare Regular Season" },
    23: { tabNum: 10, text: "Play Through Season" },
    24: { tabNum: 11, text: "Complete Postseason" },
  };
  frItems = {
    1: {
      stepNum: 0,
      guide: [0, 1],
      season: 2,
      platform: [1, 2],
      text:
        "(Don't forget to use the new franchise file you created at the end of the previous season)",
      note: "(Do not advance to the offseason yet)",
    },

    2: {
      stepNum: 1,
      guide: [1],
      season: 2,
      platform: [0],
      text: "Sign all practice squad players you wish to keep",
      note:
        "(If you need to free up space, first use Nza to move players from your main roster to the PS team)",
    },
    3: {
      stepNum: 1,
      guide: [1],
      season: 2,
      platform: [1],
      text: "Add every player on your PS team to your regular team",
      note: 0,
    },

    5: {
      stepNum: 2,
      guide: [1],
      season: 2,
      platform: [1],
      text:
        "Check the count of how many free agents are in the roster, get number down to 450",
      note: 0,
    },
    6: {
      stepNum: 2,
      guide: [0, 1],
      season: 2,
      platform: [1, 2],
      text: "Remove user control for CPU teams",
      note: 0,
    },
    7: {
      stepNum: 2,
      guide: [0, 1],
      season: 2,
      platform: [1],
      text: "Revert coach slider adjustments",
      note: 0,
    },
    8: {
      stepNum: 2,
      guide: [0, 1],
      season: 2,
      platform: [1],
      text: "Run Advanced AWR Boost",
      note: 0,
    },
    9: {
      stepNum: 2,
      guide: [0, 1],
      season: 2,
      platform: [1],
      text: "Run OVR Recalculate",
      note: 0,
    },

    10: {
      stepNum: 3,
      guide: [0, 1],
      season: 2,
      platform: [0],
      text: "Advance to the offseason",
      note: 0,
    },

    11: {
      stepNum: 4,
      guide: [0],
      season: 2,
      platform: [0],
      text: "Sign coaches if necessary",
      note: 0,
    },
    12: {
      stepNum: 4,
      guide: [0],
      season: 2,
      platform: [0],
      text: "Hire training staff if necessary",
      note: 0,
    },
    13: {
      stepNum: 4,
      guide: [1],
      season: 2,
      platform: [0],
      text: "Progress through Coach Signings",
      note: 0,
    },

    14: {
      stepNum: 5,
      guide: [0],
      season: 2,
      platform: [0],
      text: "Set prices and perform stadium maintenance as needed",
      note: 0,
    },
    15: {
      stepNum: 5,
      guide: [1],
      season: 2,
      platform: [0],
      text: "Progress through Owner's Box",
      note: 0,
    },
    16: {
      stepNum: 5,
      guide: [0, 1],
      season: 2,
      platform: [0],
      text: "Advance to Player Retirement",
      note: 0,
    },

    17: {
      stepNum: 6,
      guide: [1],
      season: 2,
      platform: [1],
      text: "Check 'Do not save skin tone' under Draft Class > Skin Tone",
      note: 0,
    },
    18: {
      stepNum: 6,
      guide: [0],
      season: 2,
      platform: [1, 2],
      text: "Import draft class (if using custom draft class)",
      note: 0,
    },
    19: {
      stepNum: 6,
      guide: [1],
      season: 2,
      platform: [1],
      text: "Import draft class (if using custom draft class)",
      note: 0,
    },
    20: {
      stepNum: 6,
      guide: [0],
      season: 2,
      platform: [1],
      text: "If using game generated draft class, apply Rookie Ratings Fix",
      note: 0,
    },
    21: {
      stepNum: 6,
      guide: [1],
      season: 2,
      platform: [1],
      text:
        "If using game generated draft class, click 'Load from FRA' then apply Rookie Ratings Fix",
      note: 0,
    },
    22: {
      stepNum: 6,
      guide: [0, 1],
      season: 2,
      platform: [1],
      text: "Apply career stat fix",
      note: 0,
    },
    23: {
      stepNum: 6,
      guide: [0, 1],
      season: 2,
      platform: [1],
      text: "Apply player body fix",
      note: 0,
    },

    24: {
      stepNum: 7,
      guide: [0, 1],
      season: 2,
      platform: [0],
      text: "Progress through Retired Players",
      note: 0,
    },
    25: {
      stepNum: 7,
      guide: [0, 1],
      season: 2,
      platform: [0],
      text: "Progress through Roster Management",
      note: 0,
    },
    26: {
      stepNum: 7,
      guide: [0, 1],
      season: 2,
      platform: [0],
      text: "Progress through Restricted Free Agents",
      note: 0,
    },
    27: {
      stepNum: 7,
      guide: [0, 1],
      season: 2,
      platform: [0],
      text: "Advance to Re-Sign Players",
      note: 0,
    },

    28: {
      stepNum: 8,
      guide: [0, 1],
      season: 2,
      platform: [1],
      text: "Apply AWR regression fix",
      note:
        '(Recommend selecting "revert all AWR changes" instead of "revert all rating regression")',
    },
    29: {
      stepNum: 8,
      guide: [0],
      season: 2,
      platform: [0],
      text: "Re-sign players as needed and advance to Free Agency",
      note: 0,
    },
    30: {
      stepNum: 8,
      guide: [1],
      season: 2,
      platform: [0],
      text:
        "Re-sign any players you plan to re-sign, and release all the players you don't want back or will let test free agency",
      note: "(Every player on your team should have a contract)",
    },
    31: {
      stepNum: 8,
      guide: [1],
      season: 2,
      platform: [1],
      text: "Move 35 players from your main team to the PS team",
      note: 0,
    },

    32: {
      stepNum: 9,
      guide: [0, 1],
      season: 2,
      platform: [0],
      text: "Progress through Free Agency to 0 days left, DO NOT ADVANCE",
      note: 0,
    },

    33: {
      stepNum: 10,
      guide: [0, 1],
      season: 2,
      platform: [1, 2],
      text: "User control all teams",
      note: 0,
    },
    34: {
      stepNum: 10,
      guide: [0, 1],
      season: 2,
      platform: [0, 2],
      text: 'Ensure "Draft Players" is set to USER for all teams',
      note: 0,
    },

    35: {
      stepNum: 11,
      guide: [0, 1],
      season: 2,
      platform: [0],
      text:
        "Enter the draft and manually pick for each team, then advance to Sign Draft Picks",
      note: "(Do not sim the draft and do not sign any draft picks)",
    },

    36: {
      stepNum: 12,
      guide: [0, 1],
      season: 2,
      platform: [1, 2],
      text: "Remove user control for CPU teams",
      note: 0,
    },
    37: {
      stepNum: 12,
      guide: [0, 1],
      season: 2,
      platform: [2],
      text: "Complete draft in Madden Amp",
      note: 0,
    },
    38: {
      stepNum: 12,
      guide: [0, 1],
      season: 2,
      platform: [2],
      text: "Save the traded draft pick file",
      note: 0,
    },
    39: {
      stepNum: 12,
      guide: [0, 1],
      season: 2,
      platform: [1],
      text: "Run OVR Recalculate",
      note: 0,
    },

    40: {
      stepNum: 13,
      guide: [0],
      season: 2,
      platform: [0],
      text: "Sign rookies to dummy contracts",
      note: 0,
    },
    41: {
      stepNum: 13,
      guide: [1],
      season: 2,
      platform: [0],
      text: "Sign draft picks and advance to Free Agency",
      note: 0,
    },
    42: {
      stepNum: 13,
      guide: [0],
      season: 2,
      platform: [0],
      text: "Advance to Free Agency but do not sign any free agents",
      note: 0,
    },
    43: {
      stepNum: 13,
      guide: [0],
      season: 2,
      platform: [1],
      text: "Apply rookie contract fix",
      note: `(Choose year <span class="curYear"></span>)`,
    },

    44: {
      stepNum: 14,
      guide: [0],
      season: 2,
      platform: [0],
      text: "Complete Free Agency and advance",
      note: 0,
    },
    45: {
      stepNum: 14,
      guide: [0],
      season: 2,
      platform: [0],
      text: "Reorder depth charts and advance",
      note: 0,
    },
    46: {
      stepNum: 14,
      guide: [1],
      season: 2,
      platform: [0],
      text: "Progress through Free Agency",
      note: 0,
    },
    47: {
      stepNum: 14,
      guide: [1],
      season: 2,
      platform: [0],
      text: "Progress through Reorder Depth Charts",
      note: 0,
    },
    48: {
      stepNum: 14,
      guide: [0, 1],
      season: 2,
      platform: [0],
      text: "Start new season",
      note: "(Do not skip training camp yet)",
    },

    49: {
      stepNum: 15,
      guide: [0, 1],
      season: 2,
      platform: [2],
      text: "Move traded draft picks from file",
      note: "(Choose file saved at the end of Madden Amp draft)",
    },
    50: {
      stepNum: 15,
      guide: [0, 1],
      season: 2,
      platform: [0],
      text: "Skip training camp",
      note: 0,
    },

    51: {
      stepNum: 16,
      guide: [0, 1],
      season: 1,
      platform: [0],
      text: "Create new franchise",
      note: 0,
    },
    52: {
      stepNum: 16,
      guide: [0, 1],
      season: 1,
      platform: [0],
      text: "Skip Training Camp",
      note: 0,
    },

    53: {
      stepNum: 17,
      guide: [0],
      season: 1,
      platform: [1],
      text: "Set franchise options and injury sliders",
      note: 0,
    },
    54: {
      stepNum: 17,
      guide: [0],
      season: 1,
      platform: [1],
      text: "Set progression weeks",
      note: 0,
    },
    55: {
      stepNum: 17,
      guide: [0],
      season: 1,
      platform: [0, 1, 2],
      text: "Set AI sliders",
      note: 0,
    },
    56: {
      stepNum: 17,
      guide: [0],
      season: 1,
      platform: [0, 2],
      text: "Set penalty sliders",
      note: 0,
    },
    57: {
      stepNum: 17,
      guide: [1],
      season: 1,
      platform: [0, 1, 2],
      text: "Set injury sliders",
      note: "(Recommend 150% for preseason and 102-105% for sim injury)",
    },

    58: {
      stepNum: 20,
      guide: [0],
      season: 0,
      platform: [1, 2],
      text: "User control all teams",
      note: 0,
    },
    59: {
      stepNum: 20,
      guide: [0],
      season: 1,
      platform: [1, 2],
      text: "Review head coaches and note teams with 3-4 defenses",
      note: "(Save this info for next season)",
    },
    60: {
      stepNum: 20,
      guide: [0],
      season: 2,
      platform: [1, 2],
      text: "Review head coaches and note teams changing to/from 3-4 defense",
      note: "(Save this info)",
    },
    61: {
      stepNum: 20,
      guide: [0],
      season: 2,
      platform: [0, 1, 2],
      text:
        "Optimize LB/DL positions in depth chart for teams changing to/from 3-4",
      note: "(Change player positions to optimize front seven)",
    },
    62: {
      stepNum: 20,
      guide: [1],
      season: 1,
      platform: [1],
      text: "Move 35 players from your main team to the practice squad team",
      note: 0,
    },
    63: {
      stepNum: 20,
      guide: [1],
      season: 1,
      platform: [0],
      text: "Sign players until your roster is full (55 players)",
      note: 0,
    },
    64: {
      stepNum: 20,
      guide: [1],
      season: 1,
      platform: [1],
      text: "Transfer all 35 players on the PS team back to the main team",
      note: 0,
    },
    65: {
      stepNum: 20,
      guide: [1],
      season: 0,
      platform: [9],
      text: "Make a depth chart containing all 90 players",
      note: "(Save this somewhere, make a backup if you need to)",
    },
    66: {
      stepNum: 20,
      guide: [1],
      season: 0,
      platform: [1],
      text: "Move the bottom 35 of your depth chart to the PS team",
      note: 0,
    },
    67: {
      stepNum: 20,
      guide: [1],
      season: 0,
      platform: [0],
      text: "Auto-reorder the Depth Chart, then manually adjust",
      note: "(Use your 90-man depth chart for reference)",
    },
    68: {
      stepNum: 20,
      guide: [0],
      season: 0,
      platform: [1],
      text: "Apply coach slider adjustments",
      note: 0,
    },

    69: {
      stepNum: 21,
      guide: [0],
      season: 0,
      platform: [0],
      text: "Set sim injury slider to 30",
      note: 0,
    },
    70: {
      stepNum: 21,
      guide: [0],
      season: 0,
      platform: [0],
      text: "Play or sim preseason",
      note: 0,
    },
    71: {
      stepNum: 21,
      guide: [0],
      season: 0,
      platform: [0],
      text: "Advance to regular season",
      note: 0,
    },
    72: {
      stepNum: 21,
      guide: [0],
      season: 0,
      platform: [0],
      text: "Revert sim injury slider",
      note: 0,
    },
    73: {
      stepNum: 21,
      guide: [1],
      season: 0,
      platform: [0],
      text: "Play game 1",
      note: 0,
    },
    74: {
      stepNum: 21,
      guide: [1],
      season: 0,
      platform: [1],
      text:
        "If you have any injuries, replace the injured player with a player on the PS team",
      note: 0,
    },
    75: {
      stepNum: 21,
      guide: [1],
      season: 0,
      platform: [1],
      text:
        "Move your starters to the PS team and replace them with PS players",
      note: "(If you want to leave your starters in for game 2, skip this)",
    },
    76: {
      stepNum: 21,
      guide: [1],
      season: 0,
      platform: [0],
      text: "Auto-reorder the Depth Chart, then manually adjust",
      note: "(Use your 90-man depth chart for reference)",
    },
    77: {
      stepNum: 21,
      guide: [1],
      season: 0,
      platform: [0],
      text: "Play game 2",
      note: 0,
    },
    78: {
      stepNum: 21,
      guide: [1],
      season: 0,
      platform: [1],
      text: "Take all the players on the PS team and add them to the main team",
      note: 0,
    },
    79: {
      stepNum: 21,
      guide: [1],
      season: 0,
      platform: [1],
      text: "Replace the players on the PS team with the starters",
      note: "(You should now have only backups on your main team)",
    },
    80: {
      stepNum: 21,
      guide: [1],
      season: 0,
      platform: [0],
      text: "Auto-reorder the Depth Chart, then manually adjust",
      note: "(Use your 90-man depth chart for reference)",
    },
    81: {
      stepNum: 21,
      guide: [1],
      season: 0,
      platform: [0],
      text:
        "Play games 3 and 4 (you should have almost entirely backups playing)",
      note:
        "(I do not recommend playing starters, but of course, you can if you choose to)",
    },
    82: {
      stepNum: 21,
      guide: [1],
      season: 0,
      platform: [1],
      text:
        "Move all of the players from the PS team to the main team, then cut or deactivate (IR, etc.) players until you have 53",
      note: 0,
    },

    83: {
      stepNum: 22,
      guide: [0],
      season: 0,
      platform: [0, 1, 2],
      text:
        "Go through CPU depth charts quickly and make sure players are in their best positions",
      note: "(Edit player positions as needed)",
    },
    84: {
      stepNum: 22,
      guide: [0],
      season: 0,
      platform: [0],
      text:
        "Auto-reorder depth chart for each CPU team, then make any necessary manual adjustments",
      note: 0,
    },
    85: {
      stepNum: 22,
      guide: [1],
      season: 0,
      platform: [0],
      text: "Advance to the regular season",
      note: 0,
    },
    86: {
      stepNum: 22,
      guide: [1],
      season: 0,
      platform: [0],
      text: "Simulate every week 1 game except your own",
      note: 0,
    },
    87: {
      stepNum: 22,
      guide: [1],
      season: 0,
      platform: [0],
      text:
        "Check to see how many of your cut players are still available in free agency, Pick 12 (14 after 2022) to be your practice squad",
      note:
        "(Leave them in free agency instead of placing them on the PS team)",
    },
    88: {
      stepNum: 22,
      guide: [1],
      season: 0,
      platform: [0],
      text: "Set injury slider",
      note: "(Recommend 113% for regular season and 102-105% for sim injury)",
    },

    89: {
      stepNum: 23,
      guide: [0],
      season: 0,
      platform: [0],
      text: "Play/sim through regular season",
      note: 0,
    },
    90: {
      stepNum: 23,
      guide: [1],
      season: 0,
      platform: [1],
      text: "Move all IR players to the PS team",
      note: 0,
    },
    91: {
      stepNum: 23,
      guide: [1],
      season: 0,
      platform: [0],
      text: "Auto-reorder your depth chart and manually adjust as needed",
      note: 0,
    },
    92: {
      stepNum: 23,
      guide: [1],
      season: 0,
      platform: [0],
      text: "Play regular season games",
      note:
        "(Move all IR players to the PS team as needed. After all transactions, auto-reorder your depth chart and then manually adjust.)",
    },
    93: {
      stepNum: 23,
      guide: [1],
      season: 0,
      platform: [0],
      text:
        "(Each week, you may call up two players from the practice squad to the active roster, but they return to the practice squad after the game. This can only be done twice per player per season.)",
      note: 0,
    },
    94: {
      stepNum: 23,
      guide: [0, 1],
      season: 0,
      platform: [0],
      text: "Advance to postseason",
      note: 0,
    },

    95: {
      stepNum: 24,
      guide: [0, 1],
      season: 0,
      platform: [0],
      text: "Play/sim through playoffs and Super Bowl",
      note: 0,
    },
    96: {
      stepNum: 24,
      guide: [0, 1],
      season: 0,
      platform: [0],
      text: "Play/sim Pro Bowl, DO NOT ADVANCE TO OFFSEASON",
      note: 0,
    },
    97: {
      stepNum: 24,
      guide: [0, 1],
      season: 0,
      platform: [0],
      text: "Save franchise",
      note: 0,
    },
    98: {
      stepNum: 24,
      guide: [0, 1],
      season: 0,
      platform: [0],
      text: "Save as new file and exit franchise",
      note: 0,
    },

    999: {
      stepNum: 24,
      guide: [0, 1],
      season: 0,
      platform: [0],
      text: "Save and exit franchise",
      note: 0,
    },
  };
  frPlatforms = {
    game: { name: "Game", imgUrl: "img/madden08-ico.png" },
    nza: { name: "Nza's Madden Editor", imgUrl: "img/maddeneditor-ico.png" },
    amp: { name: "Madden Amp", imgUrl: "img/maddenamp-ico.png" },
  };
  infoCopy = {
    header: {
      title: "About the Franchise Checklist",
      body: `
  <p>
    Use this page to keep track of your franchise, checking off steps as you complete them.
    <strong>This page uses cookies to save your progress in case you close the window or navigate away.</strong>
  </p>
  
  <h4>Franchise Settings</h4>
  <ul>
      <li>Choose a franchise guide to follow.
        <br>RevanFan's full guide is <a href="https://www.footballidiot.com/forum/viewtopic.php?f=80&t=540#p3021" target="_blank">here</a>.
        <br>Nza's full guide is <a href="https://www.footballidiot.com/forum/viewtopic.php?f=80&t=150#p863" target="_blank">here</a>.</li>
      <li>Enter a season number. <strong>If you are starting a brand new franchise enter 1.</strong></li>
      <li>Enter the season year.</li>
  </ul>
  
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
  
  <h4>Completing the Season</h4>
  <p>After completing the entire checklist, you will be prompted to advance to the next season.
    This will bring you back to the beginning of the checklist, uncheck all steps, and increment the season and year values.</p>`,
    },
  };

  //methods
  checkForSavedProgress() {
    //check if progress is saved in cookies
    let guideSaved = true,
      seasonSaved = true,
      yearSaved = true,
      progressSaved = true;

    let cookieChosenGuide = parseInt(cookies.getCookie("chosenGuide"));
    if (cookieChosenGuide !== 0 && cookieChosenGuide !== 1) {
      console.log("chosenGuide not set!");
      guideSaved = false;
    }

    if (isNaN(parseInt(cookies.getCookie("curSeason")))) {
      console.log("curSeason not set!");
      seasonSaved = false;
    }

    if (isNaN(parseInt(cookies.getCookie("curYear")))) {
      console.log("curYear not set!");
      yearSaved = false;
    }

    if (isNaN(parseInt(cookies.getCookie("progress")))) {
      console.log("progress not set!");
      progressSaved = false;
    }

    if (
      guideSaved === false ||
      seasonSaved === false ||
      yearSaved === false ||
      progressSaved === false
    ) {
      return false;
    }
    console.log("saved progress is good");
    console.log(
      `chosenGuide: ${this.chosenGuide}, curseason: ${this.curSeason}, curYear: ${this.curYear}, progress: ${this.progress}`
    );
    return true;
  }
  setDefaults() {
    //check if globals are initialized and set if necessary

    //chosenGuide
    if (this.chosenGuide === null) {
      console.log("initializing chosenGuide...");
      let cookieChosenGuide = parseInt(cookies.getCookie("chosenGuide"));
      if (isNaN(cookieChosenGuide)) {
        console.log("chosenGuide not set!");
      } else {
        this.chosenGuide = cookieChosenGuide;
        console.log(
          "chosenGuide updated from cookie: " +
            this.frGuides[cookieChosenGuide].name
        );
      }
    }

    //curSeason
    if (this.curSeason === null) {
      console.log("initializing curSeason...");
      let cookieCurSeason = parseInt(cookies.getCookie("curSeason"));
      if (isNaN(cookieCurSeason)) {
        this.curSeason = 1;
        console.log("curSeason set to default: " + this.curSeason);
      } else {
        this.curSeason = cookieCurSeason;
        console.log("curSeason updated from cookie: " + cookieCurSeason);
      }
    }

    //curYear
    if (this.curYear === null) {
      console.log("initializing curYear...");
      let cookieCurYear = parseInt(cookies.getCookie("curYear"));
      if (isNaN(cookieCurYear)) {
        this.curYear = 2007;
        console.log("curYear set to default: " + this.curYear);
      } else {
        this.curYear = cookieCurYear;
        console.log("curYear updated from cookie: " + cookieCurYear);
      }
    }

    //checklist
    this.generateChecklist();

    //progress
    if (this.progress === null) {
      console.log("initializing progress...");
      let cookieProgress = parseInt(cookies.getCookie("progress"));
      if (isNaN(cookieProgress)) {
        this.progress = this.curChecklist.keys().next().value; //first key
        console.log("progress set to default: " + this.progress);
      } else {
        this.progress = cookieProgress;
        console.log("progress updated from cookie: " + cookieProgress);
      }
    }

    return true;
  }
  generateChecklist() {
    //clear maps
    this.curChecklist.clear();
    this.curSteps.clear();
    this.curTabs.clear();
    this.stepVals = new Set();
    this.tabVals = new Set();

    //generates tabs, steps, and items objects based on chosen settings
    console.log("generating checklist...");
    if (this.chosenGuide === null) {
      this.chosenGuide = 0;
      console.log("using default guide: " + this.chosenGuide);
    }
    console.log("chosenGuide: " + this.chosenGuide);
    let seasonKey = Math.min(2, this.curSeason);
    console.log("seasonKey: " + seasonKey);

    //generate checklist items
    let i = 0;
    let lastItem;
    for (const [key, val] of Object.entries(this.frItems)) {
      if (
        val.guide.indexOf(this.chosenGuide) !== -1 &&
        (val.season === 0 || val.season === seasonKey) &&
        key !== "999"
      ) {
        switch (true) {
          case i === 0:
            break;
          case JSON.stringify(lastItem.platform) === "[0]" &&
            JSON.stringify(val.platform) !== "[0]":
            this.curChecklist.set(i, "999"); //add save game item to curChecklist
            i++;
            break;
          default:
            break;
        }
        this.curChecklist.set(i, key); //add next item to curChecklist
        this.stepVals.add(val.stepNum);
        lastItem = val;
        i++;
      }
    }

    //update curSteps
    i = 0;
    for (const val of this.stepVals) {
      this.curSteps.set(i, val);
      i++;
    }

    //update curTabs
    for (const [key, val] of this.curSteps) {
      this.tabVals.add(this.frSteps[val].tabNum);
    }
    i = 0;
    for (const val of this.tabVals) {
      this.curTabs.set(i, val);
      i++;
    }

    console.log("updated checklist data:");
    console.log("curChecklist:");
    console.log(this.curChecklist);
    console.log("stepVals:");
    console.log(this.stepVals);
    console.log("curSteps:");
    console.log(this.curSteps);
    console.log("tabVals:");
    console.log(this.tabVals);
    console.log("curTabs:");
    console.log(this.curTabs);

    return true;
  }

  updateCookies() {
    cookies.setCookie("progress", this.progress, {
      expires: cookies.setCookieDate(9999),
      samesite: "lax",
    });
    cookies.setCookie("curSeason", this.curSeason, {
      expires: cookies.setCookieDate(9999),
      samesite: "lax",
    });
    cookies.setCookie("curYear", this.curYear, {
      expires: cookies.setCookieDate(9999),
      samesite: "lax",
    });
    cookies.setCookie("chosenGuide", this.chosenGuide, {
      expires: cookies.setCookieDate(9999),
      samesite: "lax",
    });
    console.log("cookies updated.");

    return true;
  }

  isTabCompleted(tabID) {
    // evaluates whether specified tab is completed
    let curChecklistItem = this.progress;
    if (this.progress > this.curChecklist.size - 1) {
      curChecklistItem = this.curChecklist.size - 1;
    }
    let keys = Array.from(this.curChecklist.keys());
    let step = this.frItems[this.curChecklist.get(keys[curChecklistItem])]
      .stepNum;
    if (this.curChecklist.get(curChecklistItem) === "999") {
      step = this.frItems[this.curChecklist.get(keys[curChecklistItem - 1])]
        .stepNum;
    }
    let tabNum = parseInt(this.frSteps[step].tabNum);
    let curTab = Array.from(this.tabVals).indexOf(tabNum);

    if (tabID < curTab) {
      return true;
    } else {
      return false;
    }
  }

  currentTab() {
    //calculates current tab based on global progress value
    let curChecklistItem = this.progress;
    if (this.progress > this.curChecklist.size - 1) {
      curChecklistItem = this.curChecklist.size - 1;
    }
    let keys = Array.from(this.curChecklist.keys());
    let step = this.frItems[this.curChecklist.get(keys[curChecklistItem])]
      .stepNum;
    if (this.curChecklist.get(curChecklistItem) === "999") {
      step = this.frItems[this.curChecklist.get(keys[curChecklistItem - 1])]
        .stepNum;
    }
    let tabNum = parseInt(this.frSteps[step].tabNum);
    let curTab = Array.from(this.tabVals).indexOf(tabNum);
    console.log("current tab: " + curTab);

    return curTab;
  }

  nextProgress() {
    let keys = this.curChecklist.keys();
    let next = keys.indexOf(this.progress) + 1;
    let nextVal = keys[next];
    console.log("nextProgress: " + nextVal);
    return nextVal;
  }
}

// function generateTabs() {
//   //generates navigation tabs
//   for (const [key, val] of curTabs) {
//     let tabContent = `
//       <button class="nav-link" id="tabbable-${key}-tab" data-bs-toggle="tab" data-bs-target="#tabbable-${key}" type="button" role="tab" aria-controls="tabbable-${key}" aria-selected="true" value="${key}">
//         <span class="fa-stack fa-1x">
//           <i class="far fa-circle fa-stack-1x"></i>
//           <i class="fas fa-check fa-stack-1x"></i>
//         </span>
//         ${frTabs[val].text}
//       </button>`;
//     $("#tabbable-tab").append(tabContent);
//     generatePaneContent(key);
//   }

//   return true;
// }

// function generatePaneContent(tabKey) {
//   //generate tab pane content
//   let content = `
//     <div class="tab-pane fade" id="tabbable-${tabKey}" role="tabpanel" aria-labelledby="tabbable-${tabKey}-tab">
//       <h2 class="h1">
//         ${frTabs[curTabs.get(tabKey)].text}
//       </h2>
//       ${generateTabSteps(tabKey)}
//     </div>`;
//   $("#tabbable-tabContent").append(content);
//   return true;
// }

// function generateTabSteps(tabKey) {
//   //generate tab pane steps
//   let content = '<ol class="fs-3">';
//   for (const [step, val] of curSteps) {
//     if (frSteps[val].tabNum === curTabs.get(tabKey)) {
//       content +=
//         "<li>" +
//         frSteps[val].text +
//         '<ul class="sublist list-group">' +
//         generateStepItems(step) +
//         "</ul></li>";
//     }
//   }
//   content += "</ol>";

//   return content;
// }

// function generateStepItems(stepKey) {
//   //generate step items
//   let content = "";
//   let last = "1";
//   for (const [item, val] of curChecklist) {
//     if (
//       (val !== "999" && frItems[val].stepNum === curSteps.get(stepKey)) ||
//       (val === "999" && frItems[last].stepNum === curSteps.get(stepKey))
//     ) {
//       content += `
//       <li class="list-group-item">
//         <div class="row">
//           <div class="col-auto">
//             <input class="form-check-input" type="checkbox" value="${item}" id="chklst-${item}" />
//           </div>
//           <div class="col">
//             <!-- platform: ${frItems[val].platform} -->
//             <div class="float-end">`;
//       for (const el of frItems[val].platform) {
//         content += generateImage(el);
//       }
//       content += `</div>`;
//       content += frItems[val].text;
//       if (frItems[val].note != 0) {
//         content += `<br><small>${frItems[val].note}</small>`;
//       }
//       content += `
//           </div>
//         </div>
//       </li>`;
//     }
//     last = val;
//   }

//   return content;
// }

// function generateImage(id) {
//   let platform;
//   switch (parseInt(id)) {
//     case 0:
//       platform = "game";
//       break;
//     case 1:
//       platform = "nza";
//       break;
//     case 2:
//       platform = "amp";
//       break;
//     default:
//       return "";
//   }
//   return `<img src="${frPlatforms[platform].imgUrl}" alt="${frPlatforms[platform].name}" title="${frPlatforms[platform].name}" data-bs-toggle="tooltip" data-bs-placement="bottom">`;
// }

// function generateSelectGuides() {
//   $("#chosenGuide").html(" ");
//   let content;
//   Object.keys(frGuides).forEach((key) => {
//     content = `<option value="${key}">${frGuides[key].name}</option>`;
//     $("#chosenGuide").append(content);
//   });
// }

function updateProgress() {
  //updates item checkboxes and sets active tab
  updateCookies();
  let curTab = currentTab();

  for (const [key, val] of curChecklist) {
    if (key < progress) {
      //check all items up to progress point
      $("#chklst-" + key).prop("checked", true);
      $("#chklst-" + key)
        .closest(".list-group-item")
        .addClass("bg-dark");
    } else {
      //uncheck all items past progress point
      $("#chklst-" + key).prop("checked", false);
      $("#chklst-" + key)
        .closest(".list-group-item")
        .removeClass("bg-dark");
    }
  }

  //set tab checkmarks
  completeTabs();

  //show active tab
  $("#tabbable-" + curTab + "-tab").tab("show");
  updateTabNavButtons(curTab);

  //check season completion
  if (progress > curChecklist.size - 1) {
    console.log("end of season reached.");
    nextSeasonModal.show();
    $("#bnNext").addClass("d-none");
    $("#bnAdvance").removeClass("d-none");
  } else {
    $("#bnNext").removeClass("d-none");
    $("#bnAdvance").addClass("d-none");
  }
  return true;
}

function completeTabs() {
  // evaluates each tab and sets completion checkmark
  for (const [key, val] of curTabs) {
    let idName = "#tabbable-" + key + "-tab";
    if (isTabCompleted(key)) {
      $(idName + " span.fa-stack").addClass("checked");
    } else {
      $(idName + " span.fa-stack").removeClass("checked");
    }
  }
  return true;
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
  let tabSize = curTabs.size;
  if (newTab >= tabSize) {
    newTab = tabSize - 1;
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
  if (tab === 0) {
    $("#bnPrevious").prop("disabled", true);
  } else if (tab >= curTabs.size - 1) {
    $("#bnNext").prop("disabled", true);
  }

  //toggle next/advance to next season buttons

  //remove focus
  $("#bnPrevious").blur();
  $("#bnNext").blur();

  return true;
}
