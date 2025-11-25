// config.js  – per-row single-approver version

export const cfg = {
  urls: {
    // 👉 Put the URL that opens the portal as *you* here
    // (same one you used before for Noelle)
    home: "https://<your-portal-url-here>"
  },

  sel: {
    // SWITCH USER
    activeUserText: "You are viewing Workforce Management as",
    switchLink: "text=Switch",
    switchDialogTitle: "Switch View",
    switchOption: (who) => `text="${who}"`,
    switchConfirm: 'button:has-text("Switch")',

    // SEARCH
    searchInput: 'input[placeholder*="Search by request ID"]',
    searchBtn: 'button:has(svg)',

    // (kept for compatibility, though not used in this version)
    rowById: (id) => `tr:has(a:has-text("${id}")), li:has-text("${id}")`,
    rowCheckbox: (id) =>
      `tr:has(a:has-text("${id}")) input[type="checkbox"], li:has-text("${id}") input[type="checkbox"`,

    // (bulk approve not used here, but harmless to keep)
    bulkApproveBtn: 'button:has-text("Approve")',
    approveConfirmBtn: 'button:has-text("Confirm")',
    successToast: 'div[role="status"], div.toast-success, text=successfully'
  },

  users: {
    // 👉 THIS is the *only* name this script will approve as
    // Change this string per team: e.g. "Doe, John"
    approver: "Eder, Noelle"
  },

  // 👉 Your Windows username for Edge profile path
  edgeProfileUser: "2031146"
};
