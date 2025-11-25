// approve.js
import fs from "fs";
import path from "path";
import { cfg } from "./config.js";
import {
  sleep,
  readIdsFromFile,
  ensureDir,
  ts,
  safeScreenshot,
  saveText,
  startBrowser,
  switchUser,
} from "./utils.js";

async function approveOne(page, id) {
  const numeric = id.replace("WF-", "");

  console.log(`\n→ Processing ${id}`);

  // search
  const input = page.locator(cfg.sel.searchInput).first();
  await input.waitFor({ timeout: 8000 });
  await input.fill("");
  await sleep(200);
  await input.type(numeric, { delay: 40 });

  console.log("   waiting for WF row...");

  let found = false;
  const end = Date.now() + cfg.timing.searchTimeoutMs;

  while (Date.now() < end) {
    if (await page.locator(cfg.sel.rowById(id)).count()) {
      found = true;
      break;
    }
    await sleep(cfg.timing.searchPollMs);
  }

  if (!found) {
    console.log(`   ❌ NOT FOUND`);
    return "not_found";
  }

  console.log("   found. clicking approve...");

  const approveBtn = page.locator(cfg.sel.inlineApproveBtn).first();
  if (!(await approveBtn.count())) {
    console.log("   ❌ no approve button");
    return "no_button";
  }

  await approveBtn.click({ force: true });
  await sleep(cfg.timing.afterApproveWaitMs);

  console.log(`   ✔ approved ${id}`);
  return "approved";
}

async function main() {
  const input = process.argv[2];
  if (!input) {
    console.log("Usage: node approve.js requests.csv");
    process.exit(1);
  }

  const ids = readIdsFromFile(input);

  ensureDir("logs");
  const logFile = path.join("logs", `run-${ts().replace(/[: ]/g, "")}.csv`);
  fs.writeFileSync(logFile, "timestamp,id,status\n");

  const context = await startBrowser();
  const page = await context.newPage();

  // open portal
  await page.goto(cfg.urls.home, { waitUntil: "domcontentloaded" });
  await sleep(1500);

  // switch to approver
  await switchUser(page, cfg.users.primary);

  for (const id of ids) {
    const status = await approveOne(page, id);
    fs.appendFileSync(logFile, `${ts()},${id},${status}\n`);
  }

  console.log("\nDONE ✔");
  console.log("Log saved:", logFile);
}

main();
