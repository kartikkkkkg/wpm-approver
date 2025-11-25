// utils.js
import fs from "fs";
import path from "path";
import os from "os";
import { chromium } from "playwright";
import { cfg } from "./config.js";

export function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export function ts() {
  return new Date().toISOString();
}

export function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

export function readIdsFromFile(filepath) {
  const text = fs.readFileSync(filepath, "utf8");
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  return lines.map((l) => (l.startsWith("WF-") ? l : `WF-${l}`));
}

export async function safeScreenshot(page, tag) {
  const dir = path.join("logs", "errors");
  ensureDir(dir);
  const file = path.join(dir, `${Date.now()}-${tag}.png`);
  try {
    await page.screenshot({ path: file, fullPage: true });
  } catch {}
  return file;
}

export function saveText(name, text) {
  const dir = path.join("logs", "errors");
  ensureDir(dir);
  fs.writeFileSync(path.join(dir, name), text, "utf8");
}

export function userDataDir() {
  // use your real edge profile
  return `C:\\Users\\${cfg.edgeProfileUser}\\AppData\\Local\\Microsoft\\Edge\\User Data`;
}

export async function startBrowser() {
  const profile = userDataDir();

  try {
    if (fs.existsSync(profile)) {
      const context = await chromium.launchPersistentContext(profile, {
        headless: false,
        channel: "msedge",
        viewport: { width: 1400, height: 900 },
      });
      return context;
    }
  } catch (e) {
    console.warn("Persistent Edge launch failed:", e.message);
  }

  // Fallback
  const browser = await chromium.launch({ headless: false, channel: "msedge" });
  return await browser.newContext({ viewport: { width: 1400, height: 900 } });
}

export async function switchUser(page, who) {
  console.log(`→ Switching to: ${who}`);

  await page.locator(cfg.sel.switchLink).first().click().catch(() => {});
  await sleep(500);

  // open dropdown
  const opener = [
    'text=Select...',
    '.select__control',
    '[role="combobox"]'
  ];
  for (const o of opener) {
    if (await page.locator(o).count()) {
      await page.locator(o).first().click({ force: true });
      await sleep(300);
      break;
    }
  }

  // choose the approver
  await page.locator(`text="${who}"`).first().click({ force: true }).catch(() => {});

  // confirm switch
  await page.locator(cfg.sel.switchConfirm).first().click().catch(() => {});
  await sleep(1200);
}
