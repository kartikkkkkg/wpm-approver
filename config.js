// config.js
export const cfg = {
  urls: {
    home: "https://leap.standardchartered.com/tsp/workforce-management/team/request/2/list/redirect",
  },

  users: {
    // 🔵 CHANGE THIS FOR EACH TEAM
    // Must match EXACTLY what appears in the grey banner:
    // "Eder, Noelle" or "Garrido, Alvaro" or "Gupta, Kartik"
    primary: "Eder, Noelle",
  },

  sel: {
    switchLink: "text=Switch",
    switchDialogTitle: "Switch View",
    switchConfirm: 'button:has-text("Switch")',

    searchInput: 'input[placeholder*="Search by request ID"]',

    // inline blue approve button inside the row
    inlineApproveBtn: 'span[title="Approve"] button',

    // row matcher by WF-xxxxx
    rowById: (id) => `a:has-text("${id}")`,
  },

  timing: {
    searchTimeoutMs: 40000,   // max wait for result
    searchPollMs: 1000,       // check every 1s
    afterApproveWaitMs: 15000 // wait after clicking approve
  },

  // Windows username for using Edge profile
  edgeProfileUser: "2031146",
};
